import { useEffect, useRef } from 'react'
import { displayName } from '../api/iceAndFire'
import { useBooks, useCharacter, useCharacters, useHouses } from '../hooks/useIceAndFire'
import Skeleton from './Skeleton'
import ScrollContainer from './ScrollContainer'
import './CharacterPanel.css'

function Field({ label, value }) {
  const values = (Array.isArray(value) ? value : [value]).filter(Boolean)
  if (values.length === 0) return null

  return (
    <div className="field">
      <dt>{label}</dt>
      <dd>{values.join(', ')}</dd>
    </div>
  )
}

// Relatives are characters in their own right, so the value doubles as a link
// that swaps the panel over to them.
function RelativeField({ label, url, name, onSelect }) {
  if (!url) return null

  return (
    <div className="field">
      <dt>{label}</dt>
      <dd>
        <button type="button" className="relative-link" onClick={() => onSelect(url)}>
          {name}
        </button>
      </dd>
    </div>
  )
}

function CharacterPanel({ url, onClose, onSelect, onBack }) {
  const panelRef = useRef(null)
  const { data: character, isPending, error } = useCharacter(url)
  const { data: books } = useBooks()
  const houses = useHouses(character?.allegiances ?? [])

  // father/mother/spouse are character URLs. Reusing useCharacters keeps the
  // ['character', id] key, so a relative already loaded is a cache hit and only
  // an unseen one costs a request.
  const relativeUrls = [character?.father, character?.mother, character?.spouse].filter(Boolean)
  const { characters: relatives } = useCharacters(relativeUrls)

  const relativeName = (relativeUrl) => {
    if (!relativeUrl) return null
    const relative = relatives[relativeUrls.indexOf(relativeUrl)]
    return relative ? displayName(relative) : '…'
  }

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  // Following a relative replaces the contents, so start the new one at the top.
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 })
  }, [url])

  // Books come back as URLs; the books query is already cached, so resolve names from it.
  const bookName = (bookUrl) =>
    books?.find((book) => book.url === bookUrl)?.name ?? bookUrl.split('/').pop()

  return (
    <ScrollContainer
      as="aside"
      className="character-panel"
      aria-label="Character details"
      ref={panelRef}
      header={
        <div className="panel-nav">
          {onBack ? (
            <button type="button" className="back" onClick={onBack}>
              ← Back
            </button>
          ) : (
            <span />
          )}
          <button type="button" className="close" onClick={onClose} aria-label="Close details">
            ×
          </button>
        </div>
      }
    >
      {error && <p className="error">Could not load this character: {error.message}</p>}

      {isPending ? (
        <Skeleton rows={6} />
      ) : (
        character && (
          <>
            <h2>{displayName(character)}</h2>
            <p className="status">
              {character.died ? `Died ${character.died}` : 'Alive as of the latest book'}
            </p>

            <dl>
              <Field label="Gender" value={character.gender} />
              <Field label="Culture" value={character.culture} />
              <Field label="Born" value={character.born} />
              <Field label="Titles" value={character.titles} />
              <Field label="Aliases" value={character.aliases} />
              <RelativeField
                label="Father"
                url={character.father}
                name={relativeName(character.father)}
                onSelect={onSelect}
              />
              <RelativeField
                label="Mother"
                url={character.mother}
                name={relativeName(character.mother)}
                onSelect={onSelect}
              />
              <RelativeField
                label="Spouse"
                url={character.spouse}
                name={relativeName(character.spouse)}
                onSelect={onSelect}
              />
              <Field label="Allegiances" value={houses.map((house) => house?.name)} />
              <Field label="Appears in" value={character.books.map(bookName)} />
              <Field label="POV in" value={character.povBooks.map(bookName)} />
              <Field label="TV series" value={character.tvSeries} />
              <Field label="Played by" value={character.playedBy} />
            </dl>
          </>
        )
      )}
    </ScrollContainer>
  )
}

export default CharacterPanel
