import { useEffect } from 'react'
import './Keyboard.css'

function Keyboard({ keyboardStatus, onLetterClick, onSubmit, onBackspace }) {
    const letters1stRow = 'qwertyuiop'.split('')
    const letters2ndRow = 'asdfghjkl'.split('')
    const letters3rdRow = 'zxcvbnm'.split('')
    const letters = [letters1stRow, letters2ndRow, letters3rdRow]

    useEffect(() => {
        function onKeyDown(event) {
            if (event.metaKey || event.ctrlKey || event.altKey) return

            const tag = event.target?.tagName
            if (tag === 'INPUT' || tag === 'TEXTAREA' || event.target?.isContentEditable) return

            if (event.key === 'Enter') {
                event.preventDefault()
                onSubmit()
                return
            }

            if (event.key === 'Backspace') {
                event.preventDefault()
                onBackspace()
                return
            }

            if (/^[a-zA-Z]$/.test(event.key)) {
                event.preventDefault()
                onLetterClick(event.key.toLowerCase())
            }
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [onLetterClick, onSubmit, onBackspace])

    return (
        <div className="keyboard">
            {letters.map((row, i) => (
                <div className="keyboard-row" key={i}>
                    {i === 2 && <button className="keyboard-button" onClick={onSubmit}>Go</button>}
                    {row.map((letter) => (
                        <button
                            key={letter}
                            className={`keyboard-button ${keyboardStatus[letter] ?? ''}`}
                            onClick={() => onLetterClick(letter)}
                        >
                            {letter}
                        </button>
                    ))}
                    {i === 2 && <button className="keyboard-button" onClick={onBackspace}>&lt;&lt;</button>}
                </div>
            ))}
        </div>
    )
}

export default Keyboard
