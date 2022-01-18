import React, { useEffect, useState } from 'react';
import './App.css';
import MathUtils from './MathUtils';
import StarDisplay from './StarDisplay';
import NumberButton from './NumberButton';
import PlayAgain from './PlayAgain';

function App() {
  const [gameId, setGameId] = useState(1)
  const startNewGame= () => { setGameId(gameId + 1); console.log(gameId) }
  return (   
    <Game key={gameId} Id={gameId} startNewGame={startNewGame} />
  );
}

function Game(props : any) {
  const [stars, setStars] = useState(MathUtils.random(1,9))
  const [availableNumbers, setAvailableNumbers] = useState(MathUtils.range(1,9))
  const [candidatesNumbers, setCandidatesNumbers] = useState([0])
  const [secondsLeft, setSecondsLeft] = useState(100)
  const gameStatus = availableNumbers.length == 0 ? 'won' : secondsLeft > 0 ? 'active' : 'lost'

  useEffect (() => {
    if (secondsLeft > 0 && availableNumbers.length > 0) {
      const timerid = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      },100)
      return () => clearTimeout(timerid);
    }
  })

  const computeNumberStatus = (number: number) => {
    if (!availableNumbers.includes(number))
      return 'used';
    if (candidatesNumbers.includes(number)) {
      if(MathUtils.sum(candidatesNumbers) > stars )
        return 'wrong';
      else
        return 'candidate';
    }
    return 'available';
  }

  const onNumberClick  = (number : number,status : string) => {
    
    if (status == 'used' || secondsLeft == 0)
    return;
    
    
    const newCandidateNumbers = status === 'available' ?
    candidatesNumbers.concat(number) :
    candidatesNumbers.filter(cn => cn !== number)
    setCandidatesNumbers(newCandidateNumbers)
    
    console.log(candidatesNumbers)
    if(MathUtils.sum(newCandidateNumbers) == stars) {
      const newAvailable = availableNumbers.filter(cn => !newCandidateNumbers.includes(cn))
      setAvailableNumbers(newAvailable)
      setCandidatesNumbers([])
      setStars(MathUtils.randomSumIn(newAvailable,9))
    }
  }

  return (
    <div className="game">
    <div className="help">
      Pick 1 or more numbers that sum to the number of stars
    </div>
    <div className="body">
      <div className="left">
        {gameStatus === 'active' ? <StarDisplay stars={stars}/>
        : <PlayAgain result={gameStatus} onClick={props.startNewGame}/> }
        
      </div>
      <div className="right">
        {MathUtils.range(1,9).map(number =>
            <NumberButton
             key={number}
             status={computeNumberStatus(number)}
             number={number}
             clickButton={onNumberClick}
            />) }
      </div>
    </div>
    <div className="timer">Time Remaining: {secondsLeft/10}</div>
    
  </div>
  );
}



export default App;
