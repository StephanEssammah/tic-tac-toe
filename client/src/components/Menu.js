import React from 'react'
import { useNavigate } from 'react-router-dom'


export const Menu = () => {
  const navigate = useNavigate()

  return (
    <div className="container">
      <h1 className="white-text">Logo</h1>
      <button 
        className="btn"
        onClick={() => navigate('/create-match')}
      >Create Match</button>
      <button 
        className="btn"
        onClick={() => navigate('join-match')}
      >Join Match</button>
    </div>
  )
}
