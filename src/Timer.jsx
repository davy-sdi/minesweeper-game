import { useState, useEffect, use } from 'react';

function Timer({ gameStatus }) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;

        if(gameStatus === 'playing'){
            interval = setInterval(() => {
                setTime((previousTime) => previousTime + 1)
            }, 1000);
        }else if(gameStatus === 'not playing'){
                setTime(0);
            }
        return () => clearInterval(interval);

    }, [gameStatus]);

    return(
        <div>
            Time: {time}
        </div>
    )

}

export default Timer;