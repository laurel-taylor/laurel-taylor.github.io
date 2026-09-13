import { useState } from 'react'
import BookList from './components/BookList'
import CharacterList from './components/CharacterList'
import CharacterPanel from './components/CharacterPanel'
import './App.css'

function App() {
  const [selectedBook, setSelectedBook] = useState(null)
  // A stack rather than a single URL, so following relatives can be walked back.
  // The character on screen is always the last entry.
  const [history, setHistory] = useState([])
  const currentCharacterUrl = history.at(-1) ?? null

  function selectCharacter(url) {
    setHistory([url])
  }

  function openRelative(url) {
    setHistory((previous) => (previous.at(-1) === url ? previous : [...previous, url]))
  }

  function selectBook(book) {
    setSelectedBook(book)
    setHistory([])
  }

  return (
    <div className={`app ${currentCharacterUrl ? 'with-panel' : ''}`.trim()}>
      <BookList selectedBookUrl={selectedBook?.url} onSelectBook={selectBook} />

      {selectedBook ? (
        <CharacterList
          key={selectedBook.url}
          book={selectedBook}
          selectedCharacterUrl={currentCharacterUrl}
          onSelectCharacter={selectCharacter}
        />
      ) : (
        <p className="empty">Pick a book to see its characters.</p>
      )}

      {currentCharacterUrl && (
        <CharacterPanel
          url={currentCharacterUrl}
          onSelect={openRelative}
          onBack={history.length > 1 ? () => setHistory(history.slice(0, -1)) : undefined}
          onClose={() => setHistory([])}
        />
      )}
    </div>
  )
}

export default App
