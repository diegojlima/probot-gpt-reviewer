import { Probot } from 'probot';
import {sendToGpt} from "../services/gptService";
import pullRequestHandler from "./handle-pull-request-opened";

jest.mock('../services/gptService');

describe('Pull Request Handler', () => {
    let probot: any;

    beforeEach(() => {
        probot = new Probot({});
        probot.load(pullRequestHandler);
    });

    test('handles pull_request event', async () => {
        const mockSendToGpt = sendToGpt as jest.MockedFunction<typeof sendToGpt>;
        mockSendToGpt.mockResolvedValue('This is the AI review comment');

        const mockPayload = {
            action: 'opened',
            number: 1,
            pull_request: {
                number: 1,
                body: 'This is a test pull request',
                head: {
                    ref: 'new-feature',
                    sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
                },
                base: {
                    ref: 'master',
                    sha: 'ad0703ac08e80448764b34dc089d0f73a1242ae9',
                },
            },
            repository: {
                owner: {
                    login: 'octocat',
                },
                name: 'Hello-World',
            },
        } as any;

        await probot.receive({ name: 'pull_request', payload: mockPayload });

        expect(mockSendToGpt).toHaveBeenCalled();
    });
});
