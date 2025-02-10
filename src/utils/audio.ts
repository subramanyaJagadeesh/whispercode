import * as fs from 'fs';
import * as vscode from 'vscode';
import { OpenAI } from 'openai';

export async function recordAudio(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let Mic = require('node-microphone');
        let mic = new Mic();
        let micStream = mic.startRecording();
        const outputStream = fs.createWriteStream(filePath);

        micStream.pipe(outputStream);

        vscode.window.showInformationMessage('🎤 Recording... Speak now!');

        setTimeout(() => {
            mic.stopRecording();
            vscode.window.showInformationMessage('🎤 Recording stopped.');
            resolve();
        }, 10000); // Stop recording after 5 seconds
    });
}

// ✅ Function to Transcribe Audio Using OpenAI Whisper API
export async function transcribeAudio(filePath: string, apiKey: string): Promise<string | null> {
    try {
        const openai = new OpenAI({ apiKey });
        const response = await openai.audio.transcriptions.create({
            model: "whisper-1",
            file: fs.createReadStream(filePath)
        });
        return response.text;
    } catch (error) {
        console.error("OpenAI API Error:", error);
        return null;
    }
    return null;
}