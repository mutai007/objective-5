import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ChatRoomList from './ChatRoomList';
import ChatInterface from './ChatInterface';
import './App.css';

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to="/login">Login</Link> |
          <Link to="/register">Register</Link> |
          <Link to="/">Chat Rooms</Link>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={
            <>
              <ChatRoomList onSelect={setSelectedRoom} />
              {selectedRoom && <ChatInterface room={selectedRoom} />}
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

 export default App;