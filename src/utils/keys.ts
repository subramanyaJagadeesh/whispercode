import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../extension';
import * as vscode from 'vscode';

const SECRET_KEY = "openai-api-key"; // Key for storing API key securely


export async function isValidApiKey(): Promise<boolean> {
    try {
        const openai = new OpenAI({ apiKey:OPENAI_API_KEY });
        await openai.models.list(); // Test API call to fetch available models
        return true; // API key is valid
    } catch (error) {
        console.error("Invalid OpenAI API Key:", error);
        return false; // API key is invalid
    }
}

export async function getApiKey(context: vscode.ExtensionContext): Promise<string> {
    return await context.secrets.get(SECRET_KEY) || '';
}

export async function promptForApiKey(context: vscode.ExtensionContext, update = false): Promise<string> {
    const promptMessage = update ? "Enter correct / new OpenAI API Key:" : "Enter your OpenAI API Key:";
    const apiKey = await vscode.window.showInputBox({
        prompt: promptMessage,
        ignoreFocusOut: true,
        password: true
    });

    if(!apiKey){
        vscode.window.showInformationMessage('No OPEN AI Key typed in');
        throw Error('No API key');
    }

    if (apiKey) {
        await context.secrets.store(SECRET_KEY, apiKey);
        vscode.window.showInformationMessage(update ? "OpenAI API Key updated successfully!" : "OpenAI API Key saved!");
    }
    return apiKey;
}
