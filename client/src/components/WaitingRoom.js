import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

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
    <div className="container white-text" >
      <h3 >Room Number:</h3>
      <h1>{roomNumber}</h1>
      <p>Waiting for opponent...</p>
    </div>
  )
}
