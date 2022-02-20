import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const WaitingRoom = ({socket}) => {
  const [roomNumber, setRoomNumber] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    socket.on('room_created', (room) => {
      setRoomNumber(room)
    })

    socket.on('start_match', () => {
      navigate('/play')
    })
  },[socket, navigate])

  return (
    <div className="container white-text" >
      <h3 >Room Number:</h3>
      <h1>{roomNumber}</h1>
      <p>Waiting for opponent...</p>
    </div>
  )
}
