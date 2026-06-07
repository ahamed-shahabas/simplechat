import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getDatabase, ref, push, onChildAdded } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const messages = document.getElementById('messages');

onChildAdded(ref(db, 'messages'), (snapshot) => {
 const data = snapshot.val();
 const div = document.createElement('div');
 div.className='msg';
 div.innerHTML = `<b>${data.name}</b><br>${data.message}`;
 messages.appendChild(div);
 messages.scrollTop = messages.scrollHeight;
});

document.getElementById('sendBtn').onclick = async () => {
 const name = document.getElementById('name').value || 'Anonymous';
 const message = document.getElementById('messageInput').value;
 if(!message.trim()) return;
 await push(ref(db,'messages'), { name, message });
 document.getElementById('messageInput').value='';
};