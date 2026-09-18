import { useState, useEffect, useMemo } from 'react'
import { guessLibrary } from './data/library'
import Keyboard from './components/Keyboard'
import WordGrid from './components/WordGrid'
import Message from './components/Message'
import WinMessage from './components/WinMessage'
import { evaluateGuess, getTodayWord } from './util/helpers'
import './App.css'

const STATUS_RANK = { wrong: 1, yellow: 2, green: 3 }

function App() {
  const [message, setMessage] = useState('Guess the word!')
  const [guesses, setGuesses] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const [guessHistory, setGuessHistory] = useState([])
  const [winState, setWinState] = useState(null)
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0)
  const todayWord = useMemo(() => getTodayWord(), [])

  const keyboardStatus = useMemo(() => {
    const status = {}
    for (const guess of guesses) {
      for (const tile of guess) {
        if (!tile.status) continue
        if (!status[tile.letter] || STATUS_RANK[tile.status] > STATUS_RANK[status[tile.letter]]) {
          status[tile.letter] = tile.status
        }
      }
    }
    return status
  }, [guesses])

  useEffect(() => {
    if (message === '') {
      return
    }
    const timeout = setTimeout(() => {
      setMessage('')
    }, 5000)
    return () => clearTimeout(timeout)
  }, [message])

  function onLetterClick(letter) {
    setGuesses((currentGuesses) => {
      if (currentGuesses[currentGuessIndex].length === 5) {
        return currentGuesses
      }
      return currentGuesses.map((guess, i) => i === currentGuessIndex ? [...guess, { letter: letter.toLowerCase(), status: '' }] : guess)
    })
  }

  function checkWinCondition(guess) {
    console.log('checkWinCondition', currentGuessIndex)
    if (guess === todayWord) {
      setMessage('You win!')
      setTimeout(() => {
        setWinState('win')
      }, 3000)
    } else if (currentGuessIndex === 5) {
      setMessage('Out of guesses')
      setTimeout(() => {
        setWinState('lose')
      }, 3000)
    } else {
      setCurrentGuessIndex(currentGuessIndex + 1)
    }
  }

  function onSubmit() {
    const currentTiles = guesses[currentGuessIndex]
    const guess = currentTiles.map((tile) => tile.letter).join('')

    if (guess.length !== 5) {
      return
    }
    if (!guessLibrary.has(guess)) {
      setMessage('Not a valid word')
      return
    }
    if (guessHistory.includes(guess)) {
      setMessage('Already guessed')
      return
    }

    setGuessHistory([...guessHistory, guess])
    setGuesses(guesses.map((row, i) => i === currentGuessIndex ? evaluateGuess(currentTiles, todayWord) : row))

    checkWinCondition(guess)
  }

  function onBackspace() {
    setGuesses((currentGuesses) => currentGuesses.map((guess, i) => i === currentGuessIndex ? guess.slice(0, -1) : guess))
  }

  return (
    <>
      <section id="center">
        {winState === 'win' && <WinMessage guessCount={currentGuessIndex + 1} guesses={guesses} />}
        {winState === 'lose' && <div>You lose! Today's word was <b>{todayWord}</b>.</div>}
        {winState === null && (
          <>
            <Message message={message} />
            <WordGrid guesses={guesses} />
            <Keyboard
              keyboardStatus={keyboardStatus}
              onLetterClick={onLetterClick}
              onSubmit={onSubmit}
              onBackspace={onBackspace}
            />
          </>
        )}
      </section>
    </>
  )
}

export default App
