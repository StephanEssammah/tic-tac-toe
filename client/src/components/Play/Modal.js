import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/Modal.scss'

export const Modal = ({result, rematch, setOtherPlayerReady, playerLeft, socket}) => {
  const [info, setInfo] = useState({paragraph: '', heading: ''})
  const navigate = useNavigate()

  useEffect(() => {
    setOtherPlayerReady(false)
    if(playerLeft) return setInfo({paragraph: '', heading: 'Opponent Left.'})
    if(result === 'win') setInfo({paragraph: 'Congratulations,', heading: 'You Won!'})
    if(result === 'loss') setInfo({paragraph: 'Sorry,', heading: 'You Lost...'})
    if(result === 'tie') setInfo({paragraph: '', heading: 'Tie!'})
  }, [result, setOtherPlayerReady, playerLeft])

  const backToMenu = () => {
    socket.emit('back_to_menu')
    navigate('/')
  }

  return (
    <div className="modal">
      <div className="modal__container">
        <p className="modal__paragraph">{info.paragraph}</p>
        <h1 className="modal__game-status">{info.heading}</h1>
        {!playerLeft && <button className="btn" onClick={rematch}>Play Again</button>}
        <button className="btn" onClick={backToMenu}>Back to Menu</button>
      </div>
    </div>
  )
}
