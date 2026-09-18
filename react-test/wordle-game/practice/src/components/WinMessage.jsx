import './WinMessage.css'

function messageFromGuess(guessCount) {
    switch (guessCount) {
        case 1:
            return ' Incredible!';
        case 2:
            return ' Lucky!';
        case 3:
            return ' Amazing!';
        case 4:
            return ' Great job!';
        case 5:
            return ' Not bad!';
        default:
            return ' Whew!';
    }
}

function WinMessage({ guessCount, guesses }) {
    return (
        <div className="win-message">
            <div className="win-message-title">
                You win! You guessed the word in {guessCount} guesses.
                {messageFromGuess(guessCount)}
            </div>

            {guesses.map((guess, index) => (
                <div key={index} className="word-grid-row">
                    {guess.map((tile, index) => (
                        <div key={index} className={`tile ${tile.status}`}>&nbsp;</div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default WinMessage
