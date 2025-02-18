import * as fs from 'fs';
import * as vscode from 'vscode';
import * as path from 'path';
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
            // Verify the file exists and has data
            if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
                console.error("❌ Error: Recorded file is empty or missing!");
            } else {
                console.log(`✅ Audio recorded successfully: ${filePath}`);
            }
        }, 10000); // Stop recording after 5 seconds
    });
}

// ✅ Function to Transcribe Audio Using OpenAI Whisper API
export async function transcribeAudio(filePath: string, apiKey: string): Promise<string | null> {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`Audio file not found: ${filePath}`);
        }

        const fileSize = fs.statSync(filePath).size;
        if (fileSize === 0) {
            throw new Error(`Audio file is empty or corrupted: ${filePath}`);
        }

        // Log file extension to debug format issues
        const fileExtension = path.extname(filePath).toLowerCase();
        console.warn(`Audio file format: ${fileExtension}`);

        // Ensure it's one of OpenAI's accepted formats
        const allowedFormats = [".flac", ".m4a", ".mp3", ".mp4", ".mpeg", ".mpga", ".oga", ".ogg", ".wav", ".webm"];
        if (!allowedFormats.includes(fileExtension)) {
            throw new Error(`Unsupported file format: ${fileExtension}`);
        }
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