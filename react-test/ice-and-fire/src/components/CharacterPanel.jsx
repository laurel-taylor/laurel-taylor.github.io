import { displayName } from '../api/iceAndFire'
import { useBooks, useCharacter, useCharacters, useHouses } from '../hooks/useIceAndFire'
import Panel, { Field, LinkField } from './Panel'
import Skeleton from './Skeleton'

function CharacterPanel({ url, onClose, onSelect, onBack }) {
  const { data: character, isPending, error } = useCharacter(url)
  const { data: books } = useBooks()

  const houseUrls = character?.allegiances ?? []
  const houses = useHouses(houseUrls)

  // father/mother/spouse are character URLs. Reusing useCharacters keeps the
  // ['character', id] key, so a relative already loaded is a cache hit and only
  // an unseen one costs a request.
  const relativeUrls = [character?.father, character?.mother, character?.spouse].filter(Boolean)
  const { characters: relatives } = useCharacters(relativeUrls)

  const relativeLink = (relativeUrl) => {
    if (!relativeUrl) return null
    const relative = relatives[relativeUrls.indexOf(relativeUrl)]
    return {
      type: 'character',
      url: relativeUrl,
      name: relative ? displayName(relative) : '…',
    }
  }

  // Books come back as URLs; the books query is already cached, so resolve names from it.
  const bookName = (bookUrl) =>
    books?.find((book) => book.url === bookUrl)?.name ?? bookUrl.split('/').pop()

  return (
    <Panel ariaLabel="Character details" onBack={onBack} onClose={onClose}>
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
              <LinkField
                label="Father"
                items={[relativeLink(character.father)]}
                onSelect={onSelect}
              />
              <LinkField
                label="Mother"
                items={[relativeLink(character.mother)]}
                onSelect={onSelect}
              />
              <LinkField
                label="Spouse"
                items={[relativeLink(character.spouse)]}
                onSelect={onSelect}
              />
              <LinkField
                label="Allegiances"
                items={houseUrls.map((houseUrl, index) => ({
                  type: 'house',
                  url: houseUrl,
                  name: houses[index]?.name ?? '…',
                }))}
                onSelect={onSelect}
              />
              <Field label="Appears in" value={character.books.map(bookName)} />
              <Field label="POV in" value={character.povBooks.map(bookName)} />
              <Field label="TV series" value={character.tvSeries} />
              <Field label="Played by" value={character.playedBy} />
            </dl>
          </>
        )
      )}
    </Panel>
  )
}

export default CharacterPanel
