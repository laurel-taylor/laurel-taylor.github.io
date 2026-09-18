import { useState, useEffect, useMemo } from 'react'
import { guessLibrary } from './data/library'
import Keyboard from './components/Keyboard'
import WordGrid from './components/WordGrid'
import Message from './components/Message'
import './App.css'

function App() {
  const [message, setMessage] = useState('Guess the word!')
  const [guesses, setGuesses] = useState() // TODO keep track of guesses

  function onLetterClick(letter) {
  }

  function onSubmit() {
    // TODO check if the guess is valid, already guessed, and out of guesses
    // TODO set correctly guessed letters, and those that are in the wrong position
  }

  function onBackspace() {
  }

  return (
    <section id="center">
      <Message message={message} />
      <WordGrid guesses={guesses} />
      <Keyboard
        onLetterClick={onLetterClick}
        onSubmit={onSubmit}
        onBackspace={onBackspace}
      />
    </section>
  )
}

export default App
