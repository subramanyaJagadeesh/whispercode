# Steno - AI-Powered Speech-to-Code for VS Code

Steno is a VS Code extension that allows developers to speak their code, and it automatically transcribes and formats it based on the current file type using OpenAI's Whisper and GPT-4 APIs.

## Features

- Convert Speech to Code: Speak your code, and it gets typed into VS Code automatically.
- AI-Powered Formatting: GPT-4 ensures proper syntax based on the current file type.
- Secure API Key Management: Store your OpenAI API key securely inside VS Code.
- Test API Key in UI: Check if your API key is valid before saving it.
- Works for Multiple Languages: Supports Python, JavaScript, C++, Java, C#, Go, Rust, Swift, and more.
- Web UI for Configuration: Manage API keys easily via a VS Code Webview.
- Real-time Feedback: Shows recording status and API validation results in UI.

## Installation

### Clone the repository

```sh
git clone https://github.com/yourusername/steno.git
cd steno
```
### Install dependencies
```sh
npm install
```

## How to Use

- Open a programming file in VS Code (`.py`, `.js`, `.cpp`, etc.).
- Open the **Command Palette** (`Ctrl+Shift+P` on Windows/Linux, `Cmd+Shift+P` on macOS).
- Search for **"Steno"** and select it.
- Enter your **OpenAI API Key** in the provided field.
- Speak your code in a structured format, for example: function open braces int a comma int b close braces open parenthesis return a plus b close parenthesis
  
