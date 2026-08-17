import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase yapılandırman
const firebaseConfig = {
  apiKey: "AIzaSyAyBLGudgl1THqUEAqqo6GkjjRozWT_dL4",
  authDomain: "sohbet-odasi-9722b.firebaseapp.com",
  projectId: "sohbet-odasi-9722b",
  storageBucket: "sohbet-odasi-9722b.firebasestorage.app",
  messagingSenderId: "347482470481",
  appId: "1:347482470481:web:7bfe14198f95d4cadaa070",
  measurementId: "G-YQ0YD1SKHG"
};

// Firebase başlatma
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Kullanıcı adı alma
let username = prompt("Lütfen kullanıcı adınızı girin:") || "Misafir";

// HTML elementlerini seçme
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-btn");
const messagesContainer = document.getElementById("messages-container");

// Mesaj gönderme fonksiyonu
function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") return;

    // Veritabanına mesajı gönder
    push(ref(db, 'messages'), {
        username: username,
        text: text,
        timestamp: Date.now()
    });

    messageInput.value = "";
}

// Gönder butonuna tıklama veya Enter tuşu ile gönderme
if (sendButton) {
    sendButton.addEventListener("click", sendMessage);
}
if (messageInput) {
    messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}

// Veritabanından anlık mesajları dinleme ve ekrana yazdırma
onChildAdded(ref(db, 'messages'), (snapshot) => {
    const data = snapshot.val();
    if (messagesContainer) {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message-item";
        messageDiv.innerHTML = `<strong>${data.username}:</strong> ${data.text}`;
        messagesContainer.appendChild(messageDiv);
        
        // Otomatik en alta kaydır
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
