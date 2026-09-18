import './WordGrid.css'

function WordGrid({ guesses }) {
    return (
        <div className="word-grid" >
        {guesses.map((guess, i) => (
            <div className="word-grid-row" key={i}>
                {[0,1,2,3,4].map((j) => (
                    <div
                        className={`word-grid-cell ${guess[j]?.status ?? ''}`}
                        key={j}
                    >
                        {guess[j]?.letter ?? ''}
                    </div>
                    )
                )}
            </div>
        ))}</div>
    )
}

export default WordGrid
