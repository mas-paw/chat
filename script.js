// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSPpm_Ufd10fa70HmCiZcDS53UpvZCVfE",
  authDomain: "chat-84023.firebaseapp.com",
  databaseURL: "https://chat-84023-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-84023",
  storageBucket: "chat-84023.firebasestorage.app",
  messagingSenderId: "138879175931",
  appId: "1:138879175931:web:418c9dfc90849c4198745e",
  measurementId: "G-NGXY4DDEKW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
// References
const messagesRef = db.ref("messages");
// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
const loginContainer = document.getElementById("login-container");
const chatContainer = document.getElementById("chat-container");
const usernameInput = document.getElementById("usernameInput");
const loginBtn = document.getElementById("loginBtn");
const chatWindow = document.getElementById("chat-window");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Chat references
const messagesRef = ref(db, "messages");
let currentUser = null;

// Handle Login
loginBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username) {
    currentUser = username; // Store user ID
    loginContainer.style.display = "none"; // Hide login form
    chatContainer.style.display = "flex"; // Show chat
  } else {
    alert("Please enter a valid ID!");
  }
});

// Send message
sendBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    push(messagesRef, { 
      text: message, 
      user: currentUser, 
      timestamp: Date.now() 
    });
    messageInput.value = "";
  }
});

// Display messages
onChildAdded(messagesRef, (snapshot) => {
  const data = snapshot.val();
  const messageElement = document.createElement("p");
  messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
