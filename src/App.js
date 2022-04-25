import React, { useState } from 'react';
import Header from './Header';
import Guesses from './Guesses';
import MatchedLetters from './MatchedLetters';
import WordGrid from './WordGrid';
import allWordsArray from './Words';
import './App.css';

// sets a random word at beginning of game
const word = allWordsArray[Math.floor(Math.random() * allWordsArray.length)].toUpperCase();
console.log("Word to guess: " + word);
  
function App() {
  const [input, setInput] = useState("");
  const [matchedLetters, setMatchedLetters] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [error, setError] = useState("");
  const [gameOver, setGameOver] = useState(false);
  
  
  // validates and sets input, or sets error for invalid input
  const handleInputChange = (e) => {
    // input length cannot exceed 5 characters
    if (e.target.value.length > 5) {
      setError("Your guess must be 5 characters long");
    // input can be empty string
    } else if (e.target.value === "") {
      setError("");
      setInput(e.target.value);
    // otherwise, input characters must be alphabetic
    } else if (!(/^[a-zA-Z]+$/).test(e.target.value)) {
      setError("Your guess must be alphabetic characters only")  
    // accept everything else
    } else {
      setError("");
      setInput(e.target.value);
    }
  }

  // handles guess submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // guess must 5 characters in length
    if (input.length !== 5) {
      setError("Your guess must be 5 characters long")
    // guess must be a word in the dictionary
    } else if (!isGuessAValidWord(input)) {
      setError("Guess must be a real word!")
    // otherwise, add new guess, check the guess, and reset the input
    } else {
      setGuesses([...guesses, input.toUpperCase()]);
      evaluateGuess(input);
      setInput("");
    }
  }

  // return if guess is in the dictionary
  const isGuessAValidWord = (guess) => {
    // note: all words in dictionary are lowercase strings
    return allWordsArray.includes(guess.toLowerCase());
  }

  // check whether the guess is correct
  const evaluateGuess = (guess) => {
    // first, uppercase guess 
    guess = guess.toUpperCase();
    console.log(`evaluting guess (${guess}) and word (${word})`);
    // handle successful guess!
    if (guess === word) {
      alert("You guessed correctly! The word is " + word + "!");
      setMatchedLetters(guess.split(""));
      setGameOver(true);
    
      // handle incorrect guess
    } else {
      compareWordandGuess(word, guess);
    }
  }

  // compare the word and guess
  const compareWordandGuess = (guess, word) => {    
    let guessCounter = {};
    let matches = [];
    for (let ch1 of guess) {
      guessCounter[ch1] ? guessCounter[ch1]++ : guessCounter[ch1] = 1;
    }
    for (let ch2 of word) {
      if (guessCounter[ch2] > 0) {
        matches.push(ch2);
        guessCounter[ch2]--;
      }
    }
    console.log(matches)
    if (matchedLetters.length > 0) {
      let filteredMatches = matches.filter(value => matchedLetters.includes(value));
      setMatchedLetters(filteredMatches);
    } else {
      setMatchedLetters(matches);
    }
  }

  // attached to "Click to start new game" button
  const resetGame = () => {
    setInput("");
    setMatchedLetters([]);
    setGuesses([]);
    setError("");
    setGameOver(false);
  }

  return (
    <div className="App">
      <div className="header"><Header /></div>
      <div className="guesses"><Guesses guesses={guesses} /></div>
      {gameOver ? 
        <button onClick={() => resetGame()}>Click to start new game</button>
        : <div className="wordgrid"><WordGrid handleSubmit={handleSubmit} handleInputChange={handleInputChange} input={input} /></div>
      }
      
      <div style={{color: "red", marginBottom: "1em"}}>{error}</div>
      <div><MatchedLetters matchedLetters={matchedLetters} guesses={guesses} /></div>
    </div>
  );
}

export default App;
