import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const messagesDiv = document.getElementById('messages');

// Load messages in realtime
onValue(ref(db, 'messages'), (snapshot) => {
  messagesDiv.innerHTML = '';

  if (snapshot.exists()) {
    snapshot.forEach((child) => {
      const data = child.val();

      const div = document.createElement('div');
      div.className = 'msg';
      div.innerHTML = `<b>${data.name}</b><br>${data.message}`;

      messagesDiv.appendChild(div);
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
});

// Send message
document.getElementById('sendBtn').addEventListener('click', async () => {
  const name =
    document.getElementById('name').value || 'Anonymous';

  const message =
    document.getElementById('messageInput').value.trim();

  if (!message) return;

  try {
    await push(ref(db, 'messages'), {
      name,
      message,
      time: Date.now()
    });

    document.getElementById('messageInput').value = '';
  } catch (err) {
    console.error(err);
    alert('Message failed');
  }
});
