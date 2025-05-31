const express = require('express');
const router = express.Router();

let chatRooms = [];

router.post('/create', (req, res) => {
  const { name } = req.body;
  if (chatRooms.find(r => r.name === name)) {
    return res.status(400).send('Room already exists');
  }
  const room = { name, users: [] };
  chatRooms.push(room);
  res.status(201).json(room);
});

router.get('/', (req, res) => {
  res.json(chatRooms);
});

router.post('/join', (req, res) => {
  const { name, user } = req.body;
  const room = chatRooms.find(r => r.name === name);
  if (room && !room.users.includes(user)) {
    room.users.push(user);
  }
  res.send('Joined room');
});

router.post('/leave', (req, res) => {
  const { name, user } = req.body;
  const room = chatRooms.find(r => r.name === name);
  if (room) {
    room.users = room.users.filter(u => u !== user);
  }
  res.send('Left room');
});

module.exports = router;
