import { Context } from 'probot';
import { sendToGpt } from '../services/gpt-service';

export default async (context: Context): Promise<void> => {
    // Get the Octokit SDK client
    const octokit = context.octokit;

    // Get pull request information from the event payload
    if ("pull_request" in context.payload) {
        const pullRequest = context.payload.pull_request;
        const prContent: string = pullRequest.body!;
        const repo = context.repo();
        const messages = [
            { role: 'system', content: 'You are a helpful AI that reviews code.' },
            { role: 'user', content: prContent },
        ];
        const gptResponse: string = await sendToGpt(messages);

        // Create a comment on the pull request
        await octokit.issues.createComment({
            ...repo,
            issue_number: pullRequest.number,
            body: gptResponse
        });
    }
}
