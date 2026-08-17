const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');

function mesajGonder() {
    const text = messageInput.value;
    if (text.trim() !== "") {
        const newMsg = document.createElement('p');
        newMsg.innerHTML = `<b>Sen:</b> ${text}`;
        chatBox.appendChild(newMsg);
        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

sendBtn.addEventListener('click', mesajGonder);
messageInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') mesajGonder(); });

