import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './components/Square'
import { TURNS } from './constants.js';
import { checkWinner, checkEndGame } from './logic/board.js';
import { saveGame, resetGameStorage } from './logic/storage/index.js';
import { WinnerModal } from './components/WinnerModal.jsx';
import { ResetButton } from './components/ResetButton.jsx';
import { Board } from './components/Board.jsx';
import './App.css'

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  // Reset the state values to the original values
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  }



  // The updateBoard function receives the click event from the handleClick function of the square component, updates the turn state, which by default is TURNS.X
  const updateBoard = (index) => {
    if (board[index] || winner) return; //prevent updating the board if the index already has some value or if a winner exist
    const newBoard = [... board]; // create a newBoard based on the board status
    newBoard[index] = turn; // In the new board on the square, clicked to assign the value of the current turn
    setBoard(newBoard); // Update the board status for the new board values
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    saveGame(newBoard, newTurn); // Save the game status on the localstorage

    //validate winner
    const newWinner = checkWinner(newBoard);
    if(newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  return (
    <main className="board">
      <h1>tic tac toe</h1>
      <ResetButton resetGame={resetGame} buttonText={"Reset Game"}/>
      <section className='game'>
        <Board 
        board={board}
        updateBoard={updateBoard}
        />
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          { TURNS.X }
          </Square>
        <Square isSelected={turn === TURNS.O}>
          { TURNS.O }
          </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
