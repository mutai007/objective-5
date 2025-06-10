import { useEffect, useState } from 'react';

export default function ChatRoomList({ onSelect }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('/chat')
      .then(res => res.json())
      .then(setRooms);
  }, []);

  return (
    <div className="chat-room-list">
      <h3>Available Chat Rooms</h3>
      <ul>
        {rooms.map(room => (
          <li key={room.name} onClick={() => onSelect(room.name)}>
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
