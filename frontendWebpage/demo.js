// Get form and message elements
const form = document.getElementById('crypto-form');
const messageDiv = document.getElementById('message');

// Add event listener to the form
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get input values
    const cryptoId = document.getElementById('cryptoId').value.trim();
    const userEmail = document.getElementById('userEmail').value.trim();

    // Clear previous message
    messageDiv.textContent = '';

    // Create request payload
    const data = {
        cryptoId: cryptoId,
        userEmail: userEmail
    };

    try {
        // Send POST request to the API
        const response = await fetch('https://m1hg6wz0n4.execute-api.ap-southeast-2.amazonaws.com/demo_prod/send-price-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        if (response.ok) {
            messageDiv.style.color = 'green';
            messageDiv.textContent = 'Jun has sent you a emial successfully!';
        } else {
            messageDiv.style.color = 'red';
            messageDiv.textContent = result.message || 'An error occurred. I am soooorry!';
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Failed to send request.';
    }
});