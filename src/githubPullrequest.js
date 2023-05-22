const axios = require('axios');

const owner = 'acrolinx'; // Replace with the repository owner's username or organization
const repo = 'sidebar-sdk-java'; // Replace with the repository name
const pullNumber = 56; // Replace with the actual number of the pull request
const token = 'GITHUB_TOKEN'; // Replace with your personal access token

const apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`;
const diffUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/files`;

axios.get(apiUrl, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(response => {
    // Handle the response and extract the pull request content
    const pullRequest = response.data;
    // Extract the relevant data from the pull request object based on your requirements
    const title = pullRequest.title;
    const description = pullRequest.body;
    const comments = pullRequest.comments;
    // ...
    console.log(`Title: ${title}`);
    console.log(`Description: ${description}`);
    console.log(`Number of comments: ${comments}`);

    // Fetch the code diff
    axios.get(diffUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        // Handle the response and extract the code diff
        const files = response.data;
        console.log('Code Diff:');
        files.forEach(file => {
          console.log(`- File: ${file.filename}`);
          console.log('--- Diff ---');
          console.log(file.patch);
          console.log('------------');
        });
      })
      .catch(error => {
        console.error('Error fetching code diff:', error.message);
      });
  })
  .catch(error => {
    console.error('Error fetching pull request details:', error.message);
  });