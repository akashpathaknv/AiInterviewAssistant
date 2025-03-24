import axios from 'axios';

interface ChatResponse {
    message: string;
    timestamp: string;
}

export const sendMessage = async (message: string): Promise<ChatResponse> => {
    try {
        const response = await axios.post('https://4x8xmit1d3.execute-api.us-east-1.amazonaws.com/prod/interviewAssist',
            { message },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Response from API:', response.data);
        return {
            message: response.data,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};