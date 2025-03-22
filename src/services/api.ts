import axios from 'axios';

interface ChatResponse {
    message: string;
    timestamp: string;
}

export const sendMessage = async (message: string): Promise<ChatResponse> => {
    try {
        const response = await axios.post('/api/chat', { message });
        return {
            message: response.data.message,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};