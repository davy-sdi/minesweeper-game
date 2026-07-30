import { useState } from 'react';
import BoardHead from './BoardHead';
import Board from './Board';

const boardConfigurations = {
    10: { size: 10, mines: 10 },
    15: { size: 15, mines: 20 },
    20: { size: 20, mines: 30 },
};

function createEmptyBoard(size) {
    const board = [];
    for (let row = 0; row < size; row++){
        const rowArray = [];
        for (let column = 0; column < size; column++){
            rowArray.push({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                adjacentMines: 0
            });
        }
        board.push(rowArray);
    }
    return board;
}

function placeMines(board, firstRow, firstColumn, totalMines) {
    let minesPlaced = 0;
    const size = board.length;

    while (minesPlaced < totalMines) {
        let randomRow = Math.floor(Math.random() * size);
        let randomColumn = Math.floor(Math.random() * size);
        let isFirstClick = (randomRow === firstRow && randomColumn === firstColumn);
        let hasMineAlready = (board[randomRow][randomColumn].isMine === true);

        if(isFirstClick === false){
            if(hasMineAlready === false){
                board[randomRow][randomColumn].isMine = true;
                minesPlaced++;
            }
        }
    }
}

function countAdjacentMines(board){
    let size = board.length;

    for (let row = 0; row < size; row++){
        for(let column = 0; column < size; column++){
            
            if (board[row][column].isMine === false){
                let mineCount = 0;

                for (let rowOffset = -1; rowOffset <= 1; rowOffset++){
                    for (let columnOffset = -1; columnOffset <= 1; columnOffset++){
                        
                        let neighborRow = row + rowOffset;
                        let neighborColumn = column + columnOffset;
                        let isRowInsideBoard = (neighborRow >= 0 && neighborRow < size);
                        let isColumnInsideBoard = (neighborColumn >= 0 && neighborColumn < size);

                        if (isRowInsideBoard === true && isColumnInsideBoard === true){
                            if(board[neighborRow][neighborColumn].isMine === true){
                                mineCount++
                            }
                        }
                    }
                }
            board[row][column].adjacentMines = mineCount;
            }
        }
    }
}

function revealEmptyCells(board, row, column) {
  let size = board.length;

  if (row < 0 || row >= size || column < 0 || column >= size) {
    return;
  }
  
  if (board[row][column].isRevealed === true || board[row][column].isFlagged === true) {
    return;
  }

  board[row][column].isRevealed = true;

  if (board[row][column].adjacentMines === 0) {
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
        revealEmptyCells(board, row + rowOffset, column + columnOffset);
      }
    }
  }
}

function Game(){
    const [boardSize, setBoardSize] = useState(10);
    const [board, setBoard] = useState(createEmptyBoard(10));
    const [gameStatus, setGameStatus] = useState('not playing');
    const totalMines = boardConfigurations[boardSize].mines;
    
    let flaggedCount = 0;
    for (let row = 0; row < board.length; row++){
        for (let column = 0; column < board[row].length; column++){
            if (board[row][column].isFlagged){
                flaggedCount++;
            }
        }
    }

    const flagsLeft = totalMines - flaggedCount;

    function handleCellClick(row, column){
        console.log(`Cell left-clicked at ${row}, ${column}`);
        if (gameStatus === 'lost' || gameStatus === 'won'){
            return;
        }

        if (board[row][column].isRevealed || board[row][column].isFlagged){
            return;
        }

        const newBoard = [];
        for (let row = 0; row < board.length; row++){
            const newRow = [];
            for (let column = 0; column < board[row].length; column++){
                newRow.push({
                    isMine: board[row][column].isMine,
                    isRevealed: board[row][column].isRevealed,
                    isFlagged: board[row][column].isFlagged,
                    adjacentMines: board[row][column].adjacentMines
                })
            }
            newBoard.push(newRow);
        }

        if (gameStatus === 'not playing'){
            setGameStatus('playing');
            placeMines(newBoard, row, column, totalMines);
            countAdjacentMines(newBoard);
        }

        if (newBoard[row][column].isMine === true){
            setGameStatus('lost');

            for (let rowIndex = 0; rowIndex < newBoard.length; rowIndex++){
                for (let columnIndex = 0; columnIndex < newBoard[rowIndex].length; columnIndex++){
                    newBoard[rowIndex][columnIndex].isRevealed = true;
                }
            }
        }else {
            revealEmptyCells(newBoard, row, column);

            let hiddenBombs = 0;
            for (let rowIndex = 0; rowIndex < newBoard.length; rowIndex++){
                for (let columnIndex = 0; columnIndex < newBoard[rowIndex].length; columnIndex++){
                    if (newBoard[rowIndex][columnIndex].isRevealed === false){
                        hiddenBombs++;
                    }
                }
            }
            if (hiddenBombs === totalMines){
                setGameStatus('won');
            }
        }

        setBoard(newBoard);
    }

    function handleRightClick(event, row, column){
        event.preventDefault();

        if(board[row][column].isRevealed){
            return;
        }

        if (board[row][column].isFlagged === false && flagsLeft <= 0){
            return;
        }

        const newBoard = [];
        for (let row = 0; row < board.length; row++){
            const newRow = [];
            for (let column = 0; column < board[row].length; column++){
                newRow.push({
                    isMine: board[row][column].isMine,
                    isRevealed: board[row][column].isRevealed,
                    isFlagged: board[row][column].isFlagged,
                    adjacentMines: board[row][column].adjacentMines
                })
            }
        newBoard.push(newRow);
        }
    if (newBoard[row][column].isFlagged === true){
        newBoard[row][column].isFlagged = false;
    }else {
        newBoard[row][column].isFlagged = true;
    }

    setBoard(newBoard)
    }

    function handleSizeChange(newSize){
        setBoardSize(newSize);
        setBoard(createEmptyBoard(newSize));
        setGameStatus('not playing');
    }

    function resetGame(){
        setBoard(createEmptyBoard(boardSize));
        setGameStatus('not playing');
    }

    return(
        <div className="game-container">
            <BoardHead
                gameStatus={gameStatus}
                flagsLeft={flagsLeft}
                onReset={resetGame}
                currentSize={boardSize}
                onSizeChange={handleSizeChange}
            />
            <Board
                board={board}
                onCellClick={handleCellClick}
                onCellRightClick={handleRightClick}
            />
        </div>
    )
}

export default Game;