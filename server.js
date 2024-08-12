const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const rooms = {}; // Store rooms and their connected clients

wss.on('connection', (ws) => {
  let currentRoom = null;

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === 'join') {
      currentRoom = parsedMessage.room;
      if (!rooms[currentRoom]) {
        rooms[currentRoom] = { clients: new Set(), highestBid: 0 };
      }
      rooms[currentRoom].clients.add(ws);

      // Notify all clients in the room about the new user count
      broadcastToRoom(currentRoom, {
        type: 'update',
        users: rooms[currentRoom].clients.size,
        highestBid: rooms[currentRoom].highestBid,
      });
    } else if (parsedMessage.type === 'bid' && currentRoom) {
      const bid = parsedMessage.message;
      rooms[currentRoom].highestBid = Math.max(rooms[currentRoom].highestBid, bid);

      // Broadcast the new bid to all clients in the room
      broadcastToRoom(currentRoom, {
        type: 'bid',
        message: bid,
      });
    }
  });

  ws.on('close', () => {
    if (currentRoom && rooms[currentRoom]) {
      rooms[currentRoom].clients.delete(ws);
      if (rooms[currentRoom].clients.size === 0) {
        delete rooms[currentRoom];
      } else {
        // Notify all clients in the room about the updated user count
        broadcastToRoom(currentRoom, {
          type: 'update',
          users: rooms[currentRoom].clients.size,
          highestBid: rooms[currentRoom].highestBid,
        });
      }
    }
  });
});

function broadcastToRoom(room, message) {
  if (rooms[room]) {
    rooms[room].clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
}

module.exports = { rooms }; // Export rooms

console.log('WebSocket server started on ws://localhost:8080');
