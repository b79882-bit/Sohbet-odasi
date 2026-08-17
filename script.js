const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');
const onlineCountSpan = document.getElementById('online-count');

// Siteye ilk girişte kullanıcı adı isteyelim
let kullaniciAdi = prompt("Lütfen sohbet için bir kullanıcı adı girin:") || "Misafir";

// Giriş yapıldığını sisteme bildiren hoş geldin mesajı
const welcomeMsg = document.createElement('p');
welcomeMsg.innerHTML = `<i>Sisteme <b>${kullaniciAdi}</b> olarak katıldınız.</i>`;
welcomeMsg.style.color = '#888';
chatBox.appendChild(welcomeMsg);

function mesajGonder() {
    const text = messageInput.value;
    if (text.trim() !== "") {
        const newMsg = document.createElement('p');
        newMsg.innerHTML = `<b>${kullaniciAdi}:</b> ${text}`;
        chatBox.appendChild(newMsg);
        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

sendBtn.addEventListener('click', mesajGonder);
messageInput.addEventListener('keydown', (e) => { 
    if(e.key === 'Enter') mesajGonder(); 
});

