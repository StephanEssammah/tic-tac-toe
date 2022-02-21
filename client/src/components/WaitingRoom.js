import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/WaitingRoom.scss'

export const WaitingRoom = ({socket}) => {
  const [roomNumber, setRoomNumber] = useState('')
  const [opponent, setOpponent] = useState('')
  const nickname = useLocation().state
  const navigate = useNavigate()

  useEffect(() => {
    socket.on('room_created', (room) => setRoomNumber(room))

    socket.on('opponent_joined', (opponentName) => {
      setOpponent(opponentName)
      socket.emit('send_name', roomNumber, nickname)
    })

    socket.on('start_match', () => {
      navigate('/play', { state: { room: roomNumber, playerOne: nickname, playerTwo: opponent, symbol: 'X'}})
    })

  },[socket, navigate, nickname, roomNumber, opponent])

  return (
    <div className="waiting-room container white-text" >
      <h3 className="waiting-room__top">Room Number:</h3>
      <h1 className="waiting-room__number">{roomNumber}</h1>
      <p className="waiting-room__status">Waiting for opponent...</p>
    </div>
  )
}
