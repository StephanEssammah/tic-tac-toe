import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const CreateMatch = ({socket}) => {
  const [nickname, setNickname] = useState('')
  const navigate = useNavigate()

  const submit = () => {
    if (nickname === '') return;
    socket.emit('create_room')
    navigate('/waiting-room')
  }

  return (
    <div className="container">
      <input className="input" placeholder="Nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
      <button className="btn" onClick={submit}>Continue</button>
    </div>
  )
}
