import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Menu.scss'


export const Menu = () => {
  const navigate = useNavigate()

  return (
    
    <div className="container">
      <h1 className="menu__logo">O X</h1>
      <h3 className="menu__logo-subheading">TIC TAC TOE</h3>
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
