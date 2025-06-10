import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function ChatInterface({ room }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const user = 'User' + Math.floor(Math.random() * 1000);

  useEffect(() => {
    socket.emit('joinRoom', room);
    socket.on('receiveMessage', msg => {
      setMessages(prev => [...prev, msg]);
    });
    return () => socket.off('receiveMessage');
  }, [room]);

  const sendMessage = () => {
    const msg = { text, user, room, timestamp: new Date() };
    socket.emit('sendMessage', { room, message: msg });
    setText('');
  };

  return (
    <div className="chat-interface">
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.user}</strong> [{new Date(m.timestamp).toLocaleTimeString()}]: {m.text}
          </div>
        ))}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

