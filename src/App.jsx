import React, { useState, useEffect } from 'react';
import './App.css';

const HorrorHangmanGame = () => {
  const words = ['MALÉDICTION', 'SPECTRE', 'SANGLANT', 'TÉNÈBRES', 'POSSESSION', 'MORT'];
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [remainingTries, setRemainingTries] = useState(6);
  const [gameStatus, setGameStatus] = useState('playing');

  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
  }, []);

  const guessLetter = (letter) => {
    if (gameStatus !== 'playing') return;
    
    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter)) {
      setRemainingTries(prev => prev - 1);
    }

    const isWon = word.split('').every(char => newGuessedLetters.has(char));
    if (isWon) {
      setGameStatus('won');
    }

    if (remainingTries <= 1 && !word.includes(letter)) {
      setGameStatus('lost');
    }
  };

  const resetGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters(new Set());
    setRemainingTries(6);
    setGameStatus('playing');
  };

  return (
    <div className={`game-container ${gameStatus === 'lost' ? 'game-lost' : ''}`}>
      <div className="game-wrapper">
        <h1 className="game-title">LE PENDU DAMNÉ</h1>
        
        <div className="word-display">
          {word.split('').map((letter, index) => (
            <span key={index} className="letter">
              {guessedLetters.has(letter) ? letter : '_'}
            </span>
          ))}
        </div>

        <div className="tries">Essais restants: {remainingTries}</div>

        {gameStatus === 'won' && <div className="win-message">Vous avez survécu... cette fois.</div>}
        {gameStatus === 'lost' && <div className="lose-message">La malédiction vous a frappé ! Le mot était : {word}</div>}

        <div className="keyboard">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
            <button
              key={letter}
              onClick={() => guessLetter(letter)}
              disabled={guessedLetters.has(letter) || gameStatus !== 'playing'}
              className="letter-button"
            >
              {letter}
            </button>
          ))}
        </div>

        {gameStatus !== 'playing' && (
          <button onClick={resetGame} className="reset-button">Rejouer... si vous l'osez.</button>
        )}
      </div>
    </div>
  );
};

export default HorrorHangmanGame;