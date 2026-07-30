import Row from './Row';

function Board({ board, onCellClick, onCellRightClick}){
    return (
        <div className="board">
            {board.map((rowArray,rowIndex) => (
                <Row
                    key={rowIndex}
                    rowIndex={rowIndex}
                    row={rowArray}
                    onCellClick={onCellClick}
                    onRightCellClick={onCellRightClick}
                />
            ))}

        </div>
    );
}

export default Board;