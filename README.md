# Steno - AI-Powered Speech-to-Code for VS Code

Steno is a VS Code extension that allows developers to speak their code, and it automatically transcribes and formats it based on the current file type using OpenAI's Whisper and GPT-4 APIs.

## Features

- Convert Speech to Code: Speak your code, and it gets typed into VS Code automatically.
- AI-Powered Formatting: GPT-4 ensures proper syntax based on the current file type.
- Secure API Key Management: Store your OpenAI API key securely inside VS Code.
- Works for Multiple Languages: Supports Python, JavaScript, C++, Java, C#, Go, Rust, Swift, and more.
- Real-time Feedback: Shows recording status and API validation results in UI.

## How to Use
- Install Extension
- Install SoX(Sound eXchange)
- Open a programming file in VS Code (`.py`, `.js`, `.cpp`, etc.).
- Open the **Command Palette** (`Ctrl+Shift+P` on Windows/Linux, `Cmd+Shift+P` on macOS).
- Search for **"WhisperCode"** and select it.
- Enter your **OpenAI API Key** in the provided field.
- Speak your code in a structured format, for example: function open braces int a comma int b close braces open parenthesis return a plus b close parenthesis
  
