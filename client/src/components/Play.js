import React from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/Play.scss'
import { BoardSquare } from './subcomponents/BoardSquare'

export const Play = () => {
  const {playerOne, playerTwo} = useLocation().state
  const board = [0, 1, 2, 3, 4, 5, 6, 7, 8]

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
      <h1 className="white-text">Status Message</h1>
      <div className="play__board">
        {board.map((square, index) => <BoardSquare key={index} />)}
      </div>
      <div />
    </div>
  )
}
