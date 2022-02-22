import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../../styles/Play.scss'
import { BoardSquare } from './BoardSquare'
import { Modal } from './Modal'

export const Play = ({socket}) => {
  const [whoStarted, setWhoStarted] = useState('X')
  const [myTurn, setMyTurn] = useState(false)
  const [status, setStatus] = useState('Opponents turn')
  const {playerOne, playerTwo, symbol, room} = useLocation().state
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])
  const [modal, setModal] = useState(false)
  const [result, setResult] = useState('')
  const [score, setScore] = useState([0, 0])
  const [playerLeft, setPlayerLeft] = useState(false)
  const [otherPlayerReady, setOtherPlayerReady] = useState(false)

  const rematch = () => {
    setMyTurn(false)
    setBoard(['', '', '', '', '', '', '', '', ''])
    setModal(false)
    if(otherPlayerReady) {
      socket.emit('player_ready', room)
      symbol === whoStarted
          ? setMyTurn(false)
          : setMyTurn(true)
      whoStarted === 'X' ? setWhoStarted('O') : setWhoStarted('X')
      return;
    }
    setStatus('Waiting for opponent')
    socket.emit('player_ready', room)
  }

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
    socket.on('win', () => {
      setModal(true)
      setResult('win')
      symbol === 'X' 
        ? setScore(prevScore => [prevScore[0] + 1, prevScore[1]])
        : setScore(prevScore => [prevScore[0], prevScore[1] + 1])
    })

    socket.on('loss', () => {
      setModal(true)
      setResult('loss')
      symbol === 'X' 
        ? setScore(prevScore => [prevScore[0], prevScore[1] + 1])
        : setScore(prevScore => [prevScore[0] + 1, prevScore[1]])
    })

    socket.on('tie', () => {
      setModal(true)
      setResult('tie')
    })

  }, [socket, symbol])

  useEffect(() => {
    socket.on('board_changed', (board) => setBoard(board))
    socket.on('your_turn', () => setMyTurn(true))
    socket.on('player_left', () => {
      setPlayerLeft(true)
      setModal(true)
    })
      
    socket.on('other_player_ready', () => {
      if(status === 'Waiting for opponent') {
        setMyTurn('')
        symbol === whoStarted
          ? setMyTurn(false)
          : setMyTurn(true)
        whoStarted === 'X' ? setWhoStarted('O') : setWhoStarted('X')
        return;
      }
      setOtherPlayerReady(true)
    })
  }, [socket, status, symbol, whoStarted])

  return <>
    {modal && 
    <Modal 
      rematch={rematch} 
      result={result} 
      setOtherPlayerReady={setOtherPlayerReady}
      playerLeft={playerLeft}
      socket={socket}
    />}
    <div className="play">
      <header className="play__scoreboard">
        <div>
          <p>{playerOne}</p>
          <p className="play__scoreboard__symbol">X</p>
        </div>
        <div>
          <p className="play__scoreboard__score">{score[0]} : {score[1]}</p>
        </div>
        <div>
          <p>{playerTwo}</p>
          <p className="play__scoreboard__symbol">O</p>
        </div>
      </header>
      <h1 className="white-text play__status">{status}</h1>
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
  </>
}
