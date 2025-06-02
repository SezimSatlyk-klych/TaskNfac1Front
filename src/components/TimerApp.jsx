import React, { useState, useEffect } from 'react';

function TimerApp() {
    const [name, setName] = useState('');
    const [seconds, setSeconds] = useState(10);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning && seconds > 0) {
            timer = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        }

        if (seconds === 0 && isRunning) {
            clearInterval(timer);
            setIsRunning(false);
            setIsFinished(true);
        }

        return () => clearInterval(timer);
    }, [isRunning, seconds]);

    const startTimer = () => {
        if (name.trim()) {
            setIsRunning(true);
            setIsFinished(false);
            setSeconds(10);
        }
    };

    const resetTimer = () => {
        setName('');
        setSeconds(10);
        setIsRunning(false);
        setIsFinished(false);
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Тimer</h1>

            {!isRunning && !isFinished && (
                <>
                    <input
                        type="text"
                        placeholder="Write your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br /><br />
                    <button onClick={startTimer} disabled={!name.trim()}>
                        Start
                    </button>
                </>
            )}

            {isRunning && <h2> {seconds} seconds left</h2>}

            {isFinished && (
                <h2>Well done {name}! 💪</h2>
            )}

            {(isRunning || isFinished) && (
                <button onClick={resetTimer}>Restart</button>
            )}
        </div>
    );
}

export default TimerApp;
