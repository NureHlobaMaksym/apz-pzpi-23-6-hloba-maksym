import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiAdapter {
    private model;

    constructor(apiKey: string) {
        const genAI = new GoogleGenerativeAI(apiKey);
        this.model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "Ти — технічний експерт. Відповідай лаконічно."
        });
    }

    async generateText(prompt: string): Promise<string> {
        const chat = this.model.startChat({
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        return response.text();
    }
}

class ChatService {
    constructor(private adapter: GeminiAdapter) {}

    async reply(message: string): Promise<string> {
        return this.adapter.generateText(message);
    }
}
