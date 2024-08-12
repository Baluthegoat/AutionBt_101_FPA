// File: src/pages/api/rooms.ts

import type { NextApiRequest, NextApiResponse } from 'next';

// Import the rooms object from the WebSocket server
const { rooms } = require('../../../server');

interface Room {
  name: string;
  users: number;
  highestBid: number;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const roomData: Room[] = Object.keys(rooms).map(roomName => ({
    name: roomName,
    users: rooms[roomName].clients.size,
    highestBid: rooms[roomName].highestBid,
  }));

  res.status(200).json({ rooms: roomData });
};
