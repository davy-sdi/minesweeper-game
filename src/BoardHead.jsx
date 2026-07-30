import Timer from './Timer';

function BoardHead({ gameStatus, flagsLeft, currentSize, onReset }) {
    let buttonText = "Hunting for Mines";

    if (gameStatus === "lost"){
        buttonText = "Press To Respawn";
    }else if( gameStatus === "won"){
        buttonText = "Mission Accomplished!";
    }
    
    return(
        <div className="board-head">
            <div>Flags: {flagsLeft}</div>
            <select
                value={currentSize}
                onChange={(event) => onSizeChange(Number(event.target.value))}
                >
                <option value={10}>Beginner</option>
                <option value={20}>Sailor</option>
                <option value={30}>The Hunt For Red October</option>

            </select>
                <button onClick={onReset} className="reset-button">
                    {buttonText}
                </button>
            <Timer gameStatus={gameStatus} />
        </div>
    )
}

export default BoardHead;