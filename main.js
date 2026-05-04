document.addEventListener("DOMContentLoaded", () => {
    appendMessage("Hey, How may i help you?", "bot"); 
});

document.getElementById('submitBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') 
    {
        event.preventDefault(); 
        sendMessage();
    }
});

document.getElementById('resetBtn').addEventListener('click', resetChat);

function sendMessage() 
{
    const userInput = document.getElementById('userInput').value;
    if (!userInput.trim()) return;
    appendMessage(userInput, 'user');

    const chatBody = document.getElementById('chatBody');
    chatBody.scrollTop = chatBody.scrollHeight;

    fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: userInput,
            model: "llama3.2",
            maxTokens: 5000,
            stream: false
        }),
    })
    .then(response => {
        if (!response.ok) 
        {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        appendMessage(data.response, 'bot');
        chatBody.scrollTop = chatBody.scrollHeight; 
    })
    .catch(error => {
        appendMessage('Error: ' + error.message, 'bot');
        chatBody.scrollTop = chatBody.scrollHeight; 
    });

    document.getElementById('userInput').value = ''; 
}

function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');

    if (sender === 'bot') 
        {
        const parts = message.split('. ');
        const subheading = parts[0];
        const mainContent = parts.slice(1).join('. '); 

        const subheadingElement = document.createElement('strong'); 
        subheadingElement.textContent = subheading + '.'; 
        const mainContentElement = document.createElement('span');
        mainContentElement.innerHTML = mainContent.replace(/\. /g, '.<br>');

        messageElement.appendChild(subheadingElement);
        messageElement.appendChild(document.createElement('br')); 
        messageElement.appendChild(mainContentElement);
    } 
    else 
    {
        messageElement.innerHTML = message.replace(/\. /g, '.<br>');
    }

    const chatBody = document.getElementById('chatBody');
    chatBody.appendChild(messageElement);
}

function resetChat() {
    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML = ''; 
    appendMessage("Hey, How may i help you?", "bot"); 
}

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.chat-container').classList.toggle('dark-mode');
    document.querySelector('.chat-header').classList.toggle('dark-mode');
    document.querySelector('.chat-body').classList.toggle('dark-mode');
    document.querySelector('.chat-footer').classList.toggle('dark-mode');

    const input = document.querySelector('.chat-footer input');
    if (input) 
    {
        input.classList.toggle('dark-mode');
    }

    const toggleButton = document.getElementById('themeToggle');
    toggleButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙'; 
});

document.getElementById('loading-message').classList.add('active');

setTimeout(function() {
    document.getElementById('loading-message').classList.remove('active');
    document.getElementById('chat-container').classList.add('loaded');
}, 3000);
function sendMessage() 
{
    const userInput = document.getElementById('userInput').value;
    if (!userInput.trim()) return;
    appendMessage(userInput, 'user');


    appendMessage('Loading...', 'bot-loading');

    const chatBody = document.getElementById('chatBody');
    chatBody.scrollTop = chatBody.scrollHeight;

    fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: userInput,
            model: "llama3.2",
            maxTokens: 5000,
            stream: false
        }),
    })
    .then(response => {
        if (!response.ok) 
        {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        
        removeLoadingMessage();

        appendMessage(data.response, 'bot');
        chatBody.scrollTop = chatBody.scrollHeight; 
    })
    .catch(error => {
        
        removeLoadingMessage();

        appendMessage('Error: ' + error.message, 'bot');
        chatBody.scrollTop = chatBody.scrollHeight; 
    });

    document.getElementById('userInput').value = ''; 
}

function removeLoadingMessage() {
    const loadingMessage = document.querySelector('.bot-loading');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}
function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    if (sender === 'bot-loading') {
        messageElement.classList.add('bot-message'); 
        messageElement.classList.add('bot-loading');
    } else {
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    }

    if (sender === 'bot') 
    {
        const parts = message.split('. ');
        const subheading = parts[0];
        const mainContent = parts.slice(1).join('. '); 

        const subheadingElement = document.createElement('strong'); 
        subheadingElement.textContent = subheading + '.'; 
        const mainContentElement = document.createElement('span');
        mainContentElement.innerHTML = mainContent.replace(/\. /g, '.<br>');

        messageElement.appendChild(subheadingElement);
        messageElement.appendChild(document.createElement('br')); 
        messageElement.appendChild(mainContentElement);
    } 
    else 
    {
        messageElement.innerHTML = message.replace(/\. /g, '.<br>');
    }

    const chatBody = document.getElementById('chatBody');
    chatBody.appendChild(messageElement);
}

