import { Context } from 'probot';
import { sendToGpt } from '../services/gpt-service';

export default async (context: Context): Promise<void> => {
    // Get the Octokit SDK client
    const octokit = context.octokit;

    // Get pull request information from the event payload
    if ("pull_request" in context.payload) {
        const pullRequest = context.payload.pull_request;
        const title = pullRequest.title;
        const description = pullRequest.body;
        const repo = context.repo();
        const messages = [
            { role: 'system', content: 'You are a helpful AI that reviews code.' },
            { role: 'user', content: `Pull Request Title: ${title}` },
            { role: 'user', content: `Pull Request Description: ${description}` },
        ];

        // Get the changed files in the pull request
        const filesChanged = await octokit.pulls.listFiles({
            ...repo,
            pull_number: pullRequest.number,
        });

        for (const file of filesChanged.data) {
            // Add each file diff to the messages array
            console.log(`File Changed: ${file.filename}`);

            messages.push({ role: 'user', content: 'mention the specific line in which changes were made' });
            messages.push({ role: 'user', content: `File Changed: ${file.filename}\n${file.patch}` });

            const gptResponse = await sendToGpt(messages);

            // Create a comment on the pull request
            await octokit.issues.createComment({
                ...repo,
                issue_number: pullRequest.number,
                body: `For file: ${file.filename}\n\n` + gptResponse
            });

            messages.pop();
        }

    }
}
