import React, { useState } from 'react'

export const BoardSquare = () => {
  const [clicked, setClicked] = useState(false)
  const [squareClass, setSquareClass] = useState('play__board__square__clickable')
  
  const handleClick = () => {
    setClicked(true)
    setSquareClass('play__board__square')
  }
  

  return (
    <div 
      className={squareClass}
      onClick={handleClick}
    >
      {clicked && <p className="play__board__square__symbol">X</p>}
    </div>
  )
}
