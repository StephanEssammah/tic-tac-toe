import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/Modal.scss'

export const Modal = ({result, rematch, setOtherPlayerReady}) => {
  const [paragraph, setParagraph] = useState('')
  const [heading, setHeading] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setOtherPlayerReady(false)
    if (result === 'win') {
      setParagraph('Congratulations,')
      setHeading('You Won!')
    }
    if (result === 'loss') {
      setParagraph('Sorry,')
      setHeading('You Lost...')
    }
  }, [result, setOtherPlayerReady])

  return (
    <div className="modal">
      <div className="modal__container">
        <p className="modal__paragraph">{paragraph}</p>
        <h1 className="modal__game-status">{heading}</h1>
        <button className="btn" onClick={rematch}>Play Again</button>
        <button className="btn" onClick={() => navigate('/')}>Back to Menu</button>
      </div>
    </div>
  )
}
