import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export const JoinMatch = ({socket}) => {
  const [nickname, setNickname] = useState('')
  const [opponent, setOpponent] = useState('')
  const [roomNumber, setRoomNumber] = useState('')
  const [roomFull, setRoomFull] = useState(false)
  const [roomNotFound, setRoomNotFound] = useState(false)
  const navigate = useNavigate()

  const submit = () => {
    if(roomFull) setRoomFull(false)
    if(roomNotFound) setRoomNotFound(false)
    if (nickname === '' || roomNumber === '') return;
    socket.emit('join_room', Number(roomNumber), nickname)
  }

  useEffect(() => {
    socket.on('room_full', () => setRoomFull(true))
    socket.on('room_not_found', () => setRoomNotFound(true))
    socket.on('opponent_name', (name) => setOpponent(name))
    
    socket.on('start_match', () => {
      navigate('/play', { state: { room: Number(roomNumber), playerOne: opponent, playerTwo: nickname, symbol: 'O'}})
    })
  },[socket, navigate, nickname, opponent, roomNumber])

  return (
    <div className="container">
      {roomFull && <p className="white-text">Room is full.</p>}
      {roomNotFound && <p className="white-text">Room not found.</p>}
      <input className="input" placeholder="Nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
      <input className="input" placeholder="Room number" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} />
      <button className={
        nickname === '' || roomNumber === ''
        ? 'btn btn-inactive'
        : 'btn'
      } onClick={submit}>Continue</button>
    </div>
  )
}