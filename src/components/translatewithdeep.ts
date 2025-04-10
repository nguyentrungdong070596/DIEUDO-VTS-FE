import axios from 'axios';

interface DeepSeekResponse {
    choices: { message: { content: string } }[];
}

const translateWithDeepSeek = async (text: string, targetLang: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    if (!apiKey) {
        console.error('Error: VITE_DEEPSEEK_API_KEY is not defined in .env');
        return text;
    }

    try {
        const response = await axios.post<DeepSeekResponse>(
            'https://api.deepseek.com/v1/chat/completions', // Endpoint của DeepSeek
            {
                model: 'deepseek-chat', // Model miễn phí của DeepSeek
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
        console.error('Error translating with DeepSeek:', error);
        return text;
    }
};

export default translateWithDeepSeek;