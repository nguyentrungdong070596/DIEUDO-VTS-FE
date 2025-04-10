import axios from 'axios';

interface OpenAIResponse {
    choices: { message: { content: string } }[];
}

const translateWithOpenAI = async (text: string, targetLang: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    // Kiểm tra key

    try {
        const response = await axios.post<OpenAIResponse>(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `You are a translator. Translate the following text to ${targetLang}: "${text}"`,
                    },
                ],
                max_tokens: 100,
                temperature: 0.3,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error translating with OpenAI:', error);
        return text;
    }
};

export default translateWithOpenAI;