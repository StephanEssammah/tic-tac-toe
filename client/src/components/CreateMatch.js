import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const CreateMatch = ({socket}) => {
  const [nickname, setNickname] = useState('')
  const navigate = useNavigate()

  const submit = () => {
    if (nickname === '') return;
    socket.emit('create_room')
    navigate('/waiting-room', { state: nickname})
  }

  return (
    <div className="container">
      <input 
        className="input" 
        placeholder="Nickname" 
        value={nickname} 
        onChange={e => setNickname(e.target.value)}
      />
      <button className={nickname === '' ? 'btn btn-inactive' : 'btn'} onClick={submit}>Continue</button>
    </div>
  )
}
