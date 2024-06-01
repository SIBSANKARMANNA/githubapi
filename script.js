document.getElementById('submissionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = new Date().toISOString().split('.')[0].replace(/:/g, '-');

    const data = `Name: ${name}\nEmail: ${email}\nSubmitted on: ${date}`;

    const responseMessage = document.getElementById('responseMessage');

    // Prepare the file and API request
    const fileName = `content-${date}.txt`;
    const fileContent = btoa(data); // Base64 encoding the file content

    const repo = 'SIBSANKARMANNA';
    const branch = 'main'; // or the branch where you want to commit
    const token = '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'; // GitHub PAT

    try {
        const url = `https://api.github.com/repos/${repo}/contents/${fileName}`;
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

    } catch (error) {
        console.error('Error submitting form:', error);
        responseMessage  
