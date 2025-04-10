import axios from 'axios';

const translateWithLibre = async (text: string, targetLang: string): Promise<string> => {
    try {
        const response = await axios.post<{ translatedText: string }>(
            'https://libretranslate.de/translate',
            {
                q: text,
                source: 'auto',
                target: targetLang === 'Vietnamese' ? 'vi' : 'en', // Mã ngôn ngữ
                format: 'text',
            }
        );
        return response.data.translatedText;
    } catch (error) {
        console.error('Error with LibreTranslate:', error);
        return text; // Trả về text gốc nếu lỗi
    }
};

export default translateWithLibre;