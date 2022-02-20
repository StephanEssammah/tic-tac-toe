import express from "express"
import { Server } from "socket.io"
import http from "http"
import path from "path"
import { players } from './utils.js'

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
  socket.on("create_room", () => {
    const roomNumber = Math.floor(1000 + Math.random() * 9000);
    socket.join(roomNumber)
    socket.emit('room_created', roomNumber)
  })

  socket.on("join_room", (room) => {
    if (players(io, room) === 2) return socket.emit('room_full')
    if (players(io, room) === 'not found') return socket.emit('room_not_found')
    socket.join(room)
    io.to(room).emit('start_match')
  })
})


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

server.listen(port, () => console.log('SERVER RUNNING ON PORT 3001'))