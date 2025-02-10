import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('steno.steno', async () => {
        
		const venvPython = path.join(context.asAbsolutePath('steno_env'), 'bin', 'python');
        // Run the Python script
        let pythonProcess = cp.spawn(venvPython, [context.asAbsolutePath('src/speech_to_text.py')], { cwd: context.extensionPath});
		
		vscode.window.showInformationMessage('Listening for code...');
		let generatedCode = "";
		pythonProcess.stdout.on('data', (data) => {
            generatedCode = data.toString();

            // // Capture generated code (assumes script outputs ## GENERATED CODE ##)
            // if (text.includes("## GENERATED CODE ##")) {
            //      = text.split("## GENERATED CODE ##")[1].trim();
            // }
        });

        pythonProcess.stderr.on('data', (data) => {
            vscode.window.showErrorMessage(`Error: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            vscode.window.showInformationMessage('Code transcription complete.');

            // Insert the generated code into the active editor
            const editor = vscode.window.activeTextEditor;
            if (editor && generatedCode) {
                editor.edit(editBuilder => {
                    editBuilder.insert(editor.selection.active, generatedCode);
                });
            }
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
