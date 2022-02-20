import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const JoinMatch = () => {
  const [nickname, setNickname] = useState('')
  const [roomNumber, setRoomNumber] = useState('')
  const navigate = useNavigate()

  const submit = () => {
    if (nickname === '' || roomNumber === '') return;
    // check if room exists, then navigate
  }

  return (
    <div className="container">
      <input className="input" placeholder="Nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
      <input className="input" placeholder="Room number" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} />
      <button className="btn" onClick={submit}>Continue</button>
    </div>
  )
}