import {Message, sendToGpt} from "./gpt-service";

describe('sendToGpt', () => {
    jest.setTimeout(10000);  // Set the timeout for these tests to 10 seconds

    it('should send input to GPT-3.5 and return a response', async () => {
        const input: Message[] = [
            {
                role: 'user',
                content: 'This is the first input chunk.',
            },
        ];

        const response = await sendToGpt(input);

        expect(typeof response).toEqual('string');
        expect(response.length).toBeGreaterThan(0);
    });

    it('should send input in multiple chunks (message) to GPT-3.5 and return a response talking about the two chunks', async () => {
        const input: Message[] = [
            {
                role: 'user',
                content: 'This is the first input chunk.',
            },
            {
                role: 'user',
                content: 'This is the second input chunk.',
            },
        ];

        const response = await sendToGpt(input);

        expect(typeof response).toEqual('string');
        expect(response.length).toBeGreaterThan(0);
    });
});
