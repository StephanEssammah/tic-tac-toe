import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const CreateMatch = () => {
  const [nickname, setNickname] = useState('')
  const navigate = useNavigate()

  const submit = () => {
    if (nickname === '') return;
    // create socket room
    navigate('/waiting-room')
  }

  return (
    <div className="container">
      <input className="input" placeholder="Nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
      <button className="btn" onClick={submit}>Continue</button>
    </div>
  )
}
