import React from 'react'
import '../styles/Play.scss'
import { BoardSquare } from './subcomponents/BoardSquare'

export const Play = () => {

  const board = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <div className="play">
      <header className="play__scoreboard">
        <div>
          <p>Player One</p>
          <p className="play__scoreboard__symbol">X</p>
        </div>
        <div>
          <p className="play__scoreboard__score">5 : 2</p>
        </div>
        <div>
          <p>Player Two</p>
          <p className="play__scoreboard__symbol">O</p>
        </div>
      </header>
      <h1 className="white-text">Status Message</h1>
      <div className="play__board">
        {board.map(square => <BoardSquare />)}
      </div>
      <div />
    </div>
  )
}
