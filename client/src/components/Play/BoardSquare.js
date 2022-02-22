import React, { useState, useEffect } from 'react'

export const BoardSquare = ({room, socket, board, square, index, myTurn, setMyTurn, symbol}) => {
  const [squareClass, setSquareClass] = useState('play__board__square')
  
  const handleClick = () => {
    if(!myTurn) return;
    setSquareClass('play__board__square')
    const newBoard = Array.from(board)
    newBoard[index] = symbol
    socket.emit('board_change', room, newBoard, symbol)
    setMyTurn(false)
  }

  useEffect(() => {
    myTurn && square === ''
      ? setSquareClass('play__board__square play__board__square__clickable')
      : setSquareClass('play__board__square')
  }, [myTurn, square])
  
  return (
    <div className={squareClass} onClick={handleClick}>
      {square !== '' && <p className="play__board__square__symbol">{square}</p>}
    </div>
  )
}
