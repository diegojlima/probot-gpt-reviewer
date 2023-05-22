import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import {Message, sendToGpt} from "./gptService";

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('sendToGpt', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should send messages to GPT-3.5 and return a response', async () => {
        const messages: Message[] = [
            { role: 'system', content: 'You are a helpful AI that reviews code.' },
            { role: 'user', content: 'This is a test pull request.' },
        ];

        // Mock the axios response
        mockedAxios.post.mockResolvedValue({
            data: {
                choices: [
                    {
                        message: {
                            content: 'This is the response from GPT-3.5',
                        },
                    },
                ],
            },
        });

        const response = await sendToGpt(messages);
        expect(response).toEqual('This is the response from GPT-3.5');
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });

    it('should handle errors thrown by axios.post', async () => {
        const messages: Message[] = [
            { role: 'system', content: 'You are a helpful AI that reviews code.' },
            { role: 'user', content: 'This is a test pull request.' },
        ];

        // Mock the axios response
        mockedAxios.post.mockRejectedValue(new Error('Error sending message'));

        await expect(sendToGpt(messages)).resolves.toEqual('');
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });
});
