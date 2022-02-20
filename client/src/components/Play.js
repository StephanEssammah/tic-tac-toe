import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/Play.scss'
import { BoardSquare } from './subcomponents/BoardSquare'

export const Play = ({socket}) => {
  const [myTurn, setMyTurn] = useState(false)
  const [status, setStatus] = useState('Opponents turn')
  const {playerOne, playerTwo, symbol, room} = useLocation().state
  const [board, setBoard] = useState(['', 'X', '', '', '', 'O', '', '', ''])

  useEffect(() => {
    if(symbol === 'X') {
      setMyTurn(true)
      setStatus('Your Turn!')
      return;
    }
  }, [symbol])

  useEffect(() => {
    myTurn ? setStatus('Your Turn!') : setStatus('Opponents turn')
  }, [myTurn])

  useEffect(() => {
    socket.on('board_changed', (board) => {
      setBoard(board)
    })
    socket.on('your_turn', () => {
      setMyTurn(true)
    })
  }, [socket])

  return (
    <div className="play">
      <header className="play__scoreboard">
        <div>
          <p>{playerOne}</p>
          <p className="play__scoreboard__symbol">X</p>
        </div>
        <div>
          <p className="play__scoreboard__score">5 : 2</p>
        </div>
        <div>
          <p>{playerTwo}</p>
          <p className="play__scoreboard__symbol">O</p>
        </div>
      </header>
      <h1 className="white-text">{status}</h1>
      <div className="play__board">
        {board.map((square, index) => (
          <BoardSquare 
            room={room}
            socket={socket}
            board={board} 
            symbol={symbol} 
            square={square} 
            myTurn={myTurn} 
            setMyTurn={setMyTurn}
            index={index} 
            key={index} 
          />
        ))}
      </div>
      <div />
    </div>
  )
}
