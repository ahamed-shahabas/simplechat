import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const messagesDiv = document.getElementById('messages');

// Listen for all messages in real time
onValue(ref(db, 'messages'), (snapshot) => {
  messagesDiv.innerHTML = '';

  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();

    const div = document.createElement('div');
    div.className = 'msg';
    div.innerHTML = `<b>${data.name}</b><br>${data.message}`;

    messagesDiv.appendChild(div);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Send message
document.getElementById('sendBtn').onclick = async () => {
  const name =
    document.getElementById('name').value || 'Anonymous';

  const message =
    document.getElementById('messageInput').value;

  if (!message.trim()) return;

  await push(ref(db, 'messages'), {
    name,
    message
  });

  document.getElementById('messageInput').value = '';
};
