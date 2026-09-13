import { useState } from 'react'
import { displayName } from '../api/iceAndFire'
import { useCharacters } from '../hooks/useIceAndFire'
import Skeleton from './Skeleton'
import Pager from './Pager'
import ScrollContainer from './ScrollContainer'
import './CharacterList.css'

const PAGE_SIZE = 24

function CharacterList({ book, selectedCharacterUrl, onSelectCharacter }) {
  const [page, setPage] = useState(0)

  const pageCount = Math.ceil(book.characters.length / PAGE_SIZE)
  const urls = book.characters.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const { characters, isPending, error } = useCharacters(urls)

  return (
    <ScrollContainer
      className="character-list"
      header={
        <header className="character-list-header">
          <div>
            <h2>{book.name}</h2>
            <p className="character-count">{book.characters.length} characters</p>
          </div>
          <Pager
            page={page}
            pageCount={pageCount}
            onChange={setPage}
            label="Character pages"
          />
        </header>
      }
    >
      {error && <p className="error">Could not load these characters: {error.message}</p>}

      {isPending ? (
        <Skeleton rows={8} className="character-skeleton" />
      ) : (
        <ul>
          {characters.map((character, index) => (
            <li key={urls[index]}>
              <button
                type="button"
                className={urls[index] === selectedCharacterUrl ? 'selected' : undefined}
                aria-current={urls[index] === selectedCharacterUrl}
                onClick={() => onSelectCharacter(urls[index])}
              >
                <span className="character-name">{displayName(character)}</span>
                <span className="character-meta">
                  {character?.culture || character?.titles?.find(Boolean) || '—'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </ScrollContainer>
  )
}

export default CharacterList
