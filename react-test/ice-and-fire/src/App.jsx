import { useState } from 'react'
import BookList from './components/BookList'
import CharacterList from './components/CharacterList'
import CharacterPanel from './components/CharacterPanel'
import HousePanel from './components/HousePanel'
import './App.css'

function App() {
  const [selectedBook, setSelectedBook] = useState(null)
  // A stack rather than a single record, so following links can be walked back.
  // Entries are { type: 'character' | 'house', url }; the last one is on screen.
  const [history, setHistory] = useState([])
  const current = history.at(-1) ?? null

  function selectCharacter(url) {
    setHistory([{ type: 'character', url }])
  }

  function openLink(entry) {
    setHistory((previous) => (previous.at(-1)?.url === entry.url ? previous : [...previous, entry]))
  }

  function selectBook(book) {
    setSelectedBook(book)
    setHistory([])
  }

  const panelProps = {
    url: current?.url,
    onSelect: openLink,
    onBack: history.length > 1 ? () => setHistory(history.slice(0, -1)) : undefined,
    onClose: () => setHistory([]),
  }

  return (
    <div className={`app ${current ? 'with-panel' : ''}`.trim()}>
      <BookList selectedBookUrl={selectedBook?.url} onSelectBook={selectBook} />

      {selectedBook ? (
        <CharacterList
          key={selectedBook.url}
          book={selectedBook}
          selectedCharacterUrl={current?.type === 'character' ? current.url : null}
          onSelectCharacter={selectCharacter}
        />
      ) : (
        <p className="empty">Pick a book to see its characters.</p>
      )}

      {/* Keyed by URL so each record starts fresh: scrolled to the top, and with
          the sworn-member pager back on page one. */}
      {current &&
        (current.type === 'house' ? (
          <HousePanel key={current.url} {...panelProps} />
        ) : (
          <CharacterPanel key={current.url} {...panelProps} />
        ))}
    </div>
  )
}

export default App
