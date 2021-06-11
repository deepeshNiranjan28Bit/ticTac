import React, { useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import Message from './components/Message';
import { calculateWinner } from './helpers';
import './styles/root.scss';

function App() {
  const NEW_GAME = [{ sign: Array(9).fill(null), isXNext: true }];

  const [history, setHistory] = useState(NEW_GAME);
  const [crurrentMove, setMove] = useState(0);

  const current = history[crurrentMove];
  console.log(history);

  const { winner, winningSquares } = calculateWinner(current.sign);

  const handleSquareClick = pos => {
    if (current.sign[pos] || winner) {
      return;
    }
    setHistory(prev => {
      const last = prev[prev.length - 1];

      const newBoard = last.sign.map((square, position) => {
        if (pos == position) {
          return last.isXNext ? 'X' : 'O';
        } else {
          return square;
        }
      });
      return prev.concat({ sign: newBoard, isXNext: !last.isXNext });
    });
    setMove(prev => prev + 1);
  };
  function moveTo(move) {
    setMove(move);
  }

  function onNextGame() {
    setHistory(NEW_GAME);
    setMove(0);
  }

  return (
    <div className="app">
      <h1>
        Tic <span class="text-green">Tac</span> Toe
      </h1>
      <Message winner={winner} current={current} />
      <Board
        sign={current.sign}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        onClick={onNextGame}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Restart Game
      </button>
      <h2 style={{ fontWeight: 'normal' }}>Current Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={crurrentMove} />
      <div className="bg-balls" />
    </div>
  );
}

export default App;
