document.getElementById('submissionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = new Date().toISOString().split('.')[0].replace(/:/g, '-');

    const data = `Name: ${name}\nEmail: ${email}\nSubmitted on: ${date}`;

    const responseMessage = document.getElementById('responseMessage');

    // Prepare the file and API request
    const fileName = `submissions/submission-${date}.txt`;
    const fileContent = btoa(data); // Base64 encoding the file content

    const repo = 'SIBSANKARMANNA/githubapi';
    const branch = 'main'; // or the branch where you want to commit
    const token = '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'; // GitHub PAT

    try {
        const url = `https://api.github.com/repos/${repo}/${fileName}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Form submission by ${name}`,
                content: fileContent,
                branch: branch
            })
        });

        if (response.ok) {
            responseMessage.textContent = 'Form submitted successfully!';
        } else {
            const responseData = await response.json();
            responseMessage.textContent = `Error: ${responseData.message}`;
        }

    }  catch (error) {
        console.error('Error submitting form:', error);
        responseMessage.textContent = 'There was an error submitting the form. Please try again later.';
    }
});
