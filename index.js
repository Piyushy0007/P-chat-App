const io = require('socket.io')(8000, {
  cors: { origin: "*" } // Allow CORS for client requests
});

const users = {};

io.on('connection', socket => {
  // Handle new user joining
  socket.on('new-user-joined', name => {
      // console.log("New user joined:", name);
      users[socket.id] = name; // Save the user with their socket ID
      socket.broadcast.emit('user-joined', name); // Notify others
  });

  // Handle message sending
  socket.on('send', message => {
      socket.broadcast.emit('receive', {
          message: message,
          name: users[socket.id]
      }); // Broadcast message to others
  });

  socket.on('disconnect', message => {
    socket.broadcast.emit('left', users[socket.id]
    ); 
    delete users[socket.id] 
});
}
)

