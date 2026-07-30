function Cell({ cell, onClick, onRightClick }) {
  let display = '';
  
  if(cell.isRevealed){
    if(cell.isMine) {
      display = 'X';
    }else if(cell.adjacentMines > 0){
      display = cell.adjacentMines; 
    }
  }else if(cell.isFlagged){
    display = 'F';
  }

  let buttonClass = '';
  if(cell.isRevealed){
    buttonClass = 'cell revealed';
  }else{
    buttonClass = 'cell hidden';
  }

  return(
    <button
      className={buttonClass}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {display}
    </button>
  );
}

export default Cell;
