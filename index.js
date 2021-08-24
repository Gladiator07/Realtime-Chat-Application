const PORT = process.env.PORT || 5000;
// Node server which will handle socket io connections
//creating node server port=8000
const io = require('socket.io')(PORT)

//for users
const users = {};

//io.on = instance of socket.io and listens to many socket connections
io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{ 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message : message, name : users[socket.id]})
    });

    // If someone leaves the chat, let others know 
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });


})