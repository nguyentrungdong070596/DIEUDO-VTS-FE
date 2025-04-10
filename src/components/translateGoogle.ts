import axios from 'axios';

const translateWithGoogle = async (text: string, targetLang: string): Promise<string> => {
    // Convert targetLang to language code
    const targetCode = targetLang === 'Vietnamese' ? 'vi' : 'en';

    // Set a maximum length per request (e.g., 2000 characters to be safe)
    const maxLength = 2000;

    // If text is short enough, translate directly
    if (text.length <= maxLength) {
        try {
            const response = await axios.get(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetCode}&dt=t&q=${encodeURIComponent(text)}`
            );
            const translatedText = response.data[0][0][0];
            if (translatedText === text && targetCode !== 'vi') {
                console.warn(`Translation failed: source and target value`);
            }
            return translatedText;
        } catch (error) {
            console.error('Error with Google Translate:', error);
            return text; // Return original text if there's an error
        }
    }

    // If text is too long, split into chunks and translate each part
    const chunks = [];
    for (let i = 0; i < text.length; i += maxLength) {
        chunks.push(text.slice(i, i + maxLength));
    }

    try {
        const translatedChunks = await Promise.all(
            chunks.map(async (chunk) => {
                const response = await axios.get(
                    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetCode}&dt=t&q=${encodeURIComponent(chunk)}`
                );
                return response.data[0][0][0];
            })
        );
        return translatedChunks.join(''); // Combine all translated chunks
    } catch (error) {
        console.error('Error with Google Translate:', error);
        return text; // Return original text if there's an error
    }
};

export default translateWithGoogle;