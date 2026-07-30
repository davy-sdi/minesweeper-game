import Cell from './Cell';

function Row({ row, rowIndex, onCellClick, onRightCellClick }){
    return(
        <div className="row">
            {row.map((cellObject, columnIndex) => (
                <Cell
                    key={columnIndex}
                    cell={cellObject}
                    onClick={() => onCellClick(rowIndex, columnIndex)}
                    onRightClick={(event) => onRightCellClick(event, rowIndex, columnIndex)}
                />
            ))}
        </div>
    )
}

export default Row;