import * as path from 'path';

export function detectFileType(filePath: string): string {
    const extension = path.extname(filePath).toLowerCase();

    const extensionToLanguageMap: { [key: string]: string } = {
        ".py": "Python",
        ".js": "JavaScript",
        ".ts": "TypeScript",
        ".cpp": "C++",
        ".c": "C",
        ".java": "Java",
        ".cs": "C#",
        ".html": "HTML",
        ".css": "CSS",
        ".json": "JSON",
        ".php": "PHP",
        ".rb": "Ruby",
        ".go": "Go",
        ".swift": "Swift",
        ".sh": "Bash Script",
        ".rs": "Rust"
    };

    return extensionToLanguageMap[extension] || "Python";
}
