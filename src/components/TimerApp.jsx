import React, { useState, useEffect } from 'react';

function TimerApp() {
    const [name, setName] = useState('');
    const [seconds, setSeconds] = useState(10);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [phrase, setPhrase] = useState('');
    const [duration, setDuration] = useState(10);

    const [count, setCount] = useState(
        parseInt(localStorage.getItem('count')) || 0
    );

    const phrases = [
        "You can do it!",
        "Keep going, you're almost there!",
        "You're doing great!",
        "Stay strong, stay focused!",
        "Push through!",
        "Just a bit more!",
        "Believe in yourself!",
        "Stay determined!",
        "You're unstoppable!",
        "Keep your head up!",
        "You've got this!",
        "One step at a time!",
        "Don't give up now!",
        "You're closer than you think!",
        "Finish strong!"
    ];

    useEffect(() => {
        let timer;
        if (isRunning && seconds > 0) {
            timer = setInterval(() => {
                setSeconds(prev => {
                    if (prev === 1) {
                        clearInterval(timer);
                        setIsRunning(false);
                        setIsFinished(true);
                        const newCount = count + 1;
                        setCount(newCount);
                        localStorage.setItem('count', newCount);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isRunning]);

    const startTimer = () => {
        if (name.trim()) {
            setIsRunning(true);
            setIsFinished(false);
            setSeconds(duration);
            const randomMotivationPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            setPhrase(randomMotivationPhrase);
        }
    };

    const resetTimer = () => {
        setName('');
        setSeconds(10);
        setIsRunning(false);
        setIsFinished(false);
        setPhrase('');
    };

    const handleDurationChange = (e) => {
        const value = parseInt(e.target.value);
        setDuration(value);
        setSeconds(value);
    }

    const progress = ((duration - seconds) / duration) * 100;

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>⏱ Timer</h1>

            {!isRunning && !isFinished && (
                <>
                    <input
                        type="text"
                        placeholder="Write your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br /><br />
                    <label>Select duration:</label>
                    <select value={duration} onChange={handleDurationChange}>
                        <option value={10}>10 seconds</option>
                        <option value={20}>20 seconds</option>
                        <option value={30}>30 seconds</option>
                    </select>
                    <button onClick={startTimer} disabled={!name.trim()}>
                        Start
                    </button>
                </>
            )}

            {isRunning && (
                <>
                    <h2>{phrase}</h2>
                    <p>{name}, you have {seconds} seconds left.</p>
                </>
            )}

            {isFinished && (
                <>
                    <h2 style={{ animation: 'pulse 1s infinite' }}>🎉 Well done, {name}! 💪</h2>
                    <p>You've completed the timer {count} {count === 1 ? "time" : "times"}</p>
                    <button onClick={resetTimer}>Try again</button>
                </>
            )}

            {isRunning && (
                <div>
                    <br />
                    <button onClick={resetTimer}>Try again</button>
                </div>
            )}


            <style>
                {`
                    @keyframes pulse {
                        0% { transform: scale(1); color: black; }
                        50% { transform: scale(1.1); color: green; }
                        100% { transform: scale(1); color: black; }
                    }
                `}
            </style>
        </div>
    );
}

export default TimerApp;
