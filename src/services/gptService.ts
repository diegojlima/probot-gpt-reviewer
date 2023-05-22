import axios from 'axios';

const apiEndpoint: string = 'https://api.openai.com/v1/chat/completions';
const apiKey: string = process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY: 'api-key';

export interface Message {
    role: string;
    content: string;
}

export const sendToGpt = async (messages: Message[]): Promise<string> => {
    const data = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 3000,
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
    };

    try {
        const response = await axios.post(apiEndpoint, data, config);
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error(error);
        return '';
    }
}
