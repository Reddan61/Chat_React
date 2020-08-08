const mongoose = require('mongoose');
const express = require('express');
/*const authRoutes = require('./routes/auth');
const passport = require('passport');*/
const roomsRoutes = require("./routes/rooms");

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const keys = require("./config/keys");

const http = require('http').createServer(app);
const io = require('socket.io')(http);


let roomMethods = require("./models/rooms");

/*
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected')
}).catch((err) => {
    console.log('Error = ${err}')
});
*/


let corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(morgan('dev'));

//Обработка post req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//localhost:5000/api/auth/login
/*app.use('/api/auth', authRoutes);*/

//localhost:5000/api/rooms/getRooms?getMessagesByIdRoom
app.use('/api/rooms', roomsRoutes);


//sockets
//Подключение именно к сокетам

io.on('connection', socket => {
    let ConnectedRoomIdForServer = null;
    let UserNameForServer = null;

    socket.on("SET:MAINROOM", (data) => {
        UserNameForServer = data.userName;
        console.log(`User ${socket.id} connected to MAINROOM`);
        socket.join("MAINROOM");
    });

    socket.on("LEAVE:MAINROOM", () => {
        console.log(`User ${socket.id} leaved from MAINROOM`);
        socket.leave("MAINROOM");
    });

    socket.on('SET:ROOM', (data) => {
        let newRoom = {
            id: roomMethods.getRooms().length + 1,
            nameRoom: data.NameRoom,
            users: [data.userName],
            messages: [{}]
        };
        roomMethods.setRoom(newRoom);
        socket.join(newRoom.id);
        ConnectedRoomIdForServer = newRoom.id;
        console.log(`User ${socket.id} created a new room id = ${newRoom.id}`);
        io.sockets.to("MAINROOM").emit("GET:ROOMS", newRoom);
        io.sockets.to(newRoom.id).emit("ToOwner:ROOM", {id: newRoom.id});
    });

    socket.on("JOIN:ROOM", (data) => {
        roomMethods.addUserByRoomId(data.id, data.userName);
        socket.join(data.id);
        console.log(`${socket.id} joined to ${data.id} room`);
        ConnectedRoomIdForServer = Number(data.id);
        io.sockets.to("MAINROOM").emit("JOINED:ROOM", {
            id: Number(data.id),
            userName: data.userName
        });
        io.sockets.to(data.id).emit("ADDUSER:ROOM", {
            newUser:data.userName
        })
    });

    socket.on("LEAVE:CHATROOM", (data) => {
        let id = Number(data.id);
        let userName = data.userName;
        socket.leave(id);
        roomMethods.deleteUserFromRoomByName(userName,id);
        ConnectedRoomIdForServer = null;
        if(roomMethods.getRoomById(id)[0]) {
            io.sockets.emit("LEAVE:CHATROOM", {
                id,
                newUsers: roomMethods.getRoomById(id)[0].users
            });
            io.sockets.to(id).emit("LEAVE:CHATROOM", {
               newUsers: roomMethods.getRoomById(id)[0].users
            });
        } else {
            io.sockets.emit("DELETE:ROOM", {id});
            console.log(`DELETED ${id} ROOM`)
        }
        console.log(`${socket.id} leaved from ${id} room`);
    });

    socket.on("NEW:MESSAGE", (data) => {
        roomMethods.addNewMessage(data.id,data.message);
        io.sockets.to(data.id).emit("GET:MESSAGE", {message:data.message});
    });


    socket.on("disconnect", (data) => {
        console.log(`User ${socket.id} disconnected`);
        if(ConnectedRoomIdForServer) {
            socket.leave(ConnectedRoomIdForServer);
            roomMethods.deleteUserFromRoomByName(UserNameForServer,ConnectedRoomIdForServer);
            if(roomMethods.getRoomById(ConnectedRoomIdForServer)[0]) {
                io.sockets.emit("LEAVE:CHATROOM", {
                    id: ConnectedRoomIdForServer,
                    newUsers: roomMethods.getRoomById(ConnectedRoomIdForServer)[0].users
                });
                io.sockets.to(ConnectedRoomIdForServer).emit("LEAVE:CHATROOM", {
                    newUsers: roomMethods.getRoomById(ConnectedRoomIdForServer)[0].users
                });
            } else {
                io.sockets.emit("DELETE:ROOM", {id : ConnectedRoomIdForServer});
                console.log(`DELETED ${ConnectedRoomIdForServer} ROOM`)
            }
            console.log(`${socket.id} leaved from ${ConnectedRoomIdForServer} room`);
        }
    });
    console.log(`User connected to socket ${socket.id}`);
});


module.exports = http;