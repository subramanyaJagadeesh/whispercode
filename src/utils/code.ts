import { OpenAI } from 'openai';

export async function generateCodeFromSpeech(transcribedText: string, fileType: string, apiKey: string): Promise<string | null> {
    try {
        const openai = new OpenAI({ apiKey });
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an AI that converts spoken programming code into properly formatted code." },
                { role: "user", content: `Convert this spoken programming statement into properly formatted ${fileType} code:\n${transcribedText}; Just give me the code and nothing else` }
            ]
        });

        let generatedCode = response.choices[0]?.message?.content?.trim() || "";

        // 🔹 Remove triple backticks and language specifier (e.g., "typescript")
        generatedCode = generatedCode.replace(/```[\w]*\n?/g, "").trim();

        return generatedCode;
    } catch (error) {
        console.error("GPT-4 API Error:", error);
        return null;
    }
}