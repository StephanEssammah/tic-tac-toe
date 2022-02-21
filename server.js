import express from "express"
import { Server } from "socket.io"
import http from "http"
import path from "path"
import { players, checkForWin, checkForFullBoard } from './utils.js'

const port = process.env.PORT || 3001;
const app = express()

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }  
})

io.on("connection", (socket) => {
  let socketRoom;

  socket.on("create_room", () => {
    const roomNumber = Math.floor(1000 + Math.random() * 9000);
    socketRoom = roomNumber;
    socket.join(roomNumber)
    socket.emit('room_created', roomNumber)
  })

  socket.on("join_room", (room, name) => {
    if (players(io, room) === 2) return socket.emit('room_full')
    if (players(io, room) === 'not found') return socket.emit('room_not_found')
    socketRoom = room;
    socket.join(room)
    socket.to(room).emit('opponent_joined', name)
  })

  socket.on("send_name", (room, name) => {
    socket.to(room).emit('opponent_name', name)
    io.to(room).emit('start_match')
  })

  socket.on('board_change', (room, array, symbol) => {
    io.to(room).emit('board_changed', array)
    const win = checkForWin(array, symbol)
    if (win) {
      socket.emit('win')
      socket.to(room).emit('loss')
      return;
    }
    const fullBoard = checkForFullBoard(array)
    if(fullBoard) {
      io.emit('tie')
      return;
    }
    socket.to(room).emit('your_turn')
  })

  socket.on('player_ready', (room) => {
    socket.to(room).emit('other_player_ready')
  })

  socket.on('disconnecting', () => {
    socket.to(socketRoom).emit('player_left')
  })
})


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

server.listen(port, () => console.log('SERVER RUNNING ON PORT 3001'))