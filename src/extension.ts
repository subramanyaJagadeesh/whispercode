import * as vscode from 'vscode';
import * as path from 'path';
import { getApiKey, promptForApiKey, isValidApiKey } from './utils/keys';
import { detectFileType } from './utils/file';
import { recordAudio, transcribeAudio } from './utils/audio';
import { generateCodeFromSpeech } from './utils/code';

export let OPENAI_API_KEY = '';
// const OPENAI_API_KEY = ""; // Replace with your API key

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('steno.steno', async () => {
        OPENAI_API_KEY = await getApiKey(context);

        if (!OPENAI_API_KEY) {
            OPENAI_API_KEY = await promptForApiKey(context);
            if(!await isValidApiKey()){
                promptForApiKey(context, true);
                OPENAI_API_KEY = await getApiKey(context);
            }
        }

        vscode.window.showInformationMessage('Recording... Speak your code!');
        const editor = vscode.window.activeTextEditor;

        const fileType = detectFileType(editor?.document.fileName || 'Python');
        const audioFilePath = path.join(context.extensionPath, "speech.wav");
        await recordAudio(audioFilePath);

        const transcribedText = await transcribeAudio(audioFilePath, OPENAI_API_KEY);
        if (!transcribedText) {
            vscode.window.showErrorMessage("Speech transcription failed.");
            return;
        }

        const formattedCode = await generateCodeFromSpeech(transcribedText, fileType, OPENAI_API_KEY);
        if (!formattedCode) {
            vscode.window.showErrorMessage("Code formatting failed.");
            return;
        }

        vscode.window.showInformationMessage("Code recognized. Inserting...");

        if (editor) {
            editor.edit(editBuilder => {
                editBuilder.insert(editor.selection.active, formattedCode);
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
