import { useState } from 'react'
import { displayName } from '../api/iceAndFire'
import { useCharacters, useHouse, useHouses } from '../hooks/useIceAndFire'
import Pager from './Pager'
import Panel, { Field, LinkField } from './Panel'
import Skeleton from './Skeleton'
import './HousePanel.css'

const MEMBERS_PER_PAGE = 10

function HousePanel({ url, onClose, onSelect, onBack }) {
  const [page, setPage] = useState(0)
  const { data: house, isPending, error } = useHouse(url)

  const characterUrls = [house?.currentLord, house?.heir, house?.founder].filter(Boolean)
  const { characters } = useCharacters(characterUrls)

  const houseUrls = [house?.overlord, ...(house?.cadetBranches ?? [])].filter(Boolean)
  const relatedHouses = useHouses(houseUrls)

  // swornMembers is the same one-request-per-URL shape as a book's characters,
  // and House Stark alone has ~90, so page it rather than fetching them all.
  const members = house?.swornMembers ?? []
  const memberUrls = members.slice(page * MEMBERS_PER_PAGE, (page + 1) * MEMBERS_PER_PAGE)
  const { characters: memberCharacters } = useCharacters(memberUrls)

  const characterLink = (characterUrl) => {
    if (!characterUrl) return null
    const character = characters[characterUrls.indexOf(characterUrl)]
    return {
      type: 'character',
      url: characterUrl,
      name: character ? displayName(character) : '…',
    }
  }

  const houseLink = (houseUrl) => {
    if (!houseUrl) return null
    return {
      type: 'house',
      url: houseUrl,
      name: relatedHouses[houseUrls.indexOf(houseUrl)]?.name ?? '…',
    }
  }

  return (
    <Panel ariaLabel="House details" onBack={onBack} onClose={onClose}>
      {error && <p className="error">Could not load this house: {error.message}</p>}

      {isPending ? (
        <Skeleton rows={6} />
      ) : (
        house && (
          <>
            <h2>{house.name}</h2>
            <p className="status">
              {[house.region, house.diedOut && `Died out ${house.diedOut}`]
                .filter(Boolean)
                .join(' · ')}
            </p>

            <dl>
              <Field label="Words" value={house.words} showEmpty={true} />
              <Field label="Coat of arms" value={house.coatOfArms} />
              <Field label="Titles" value={house.titles} />
              <Field label="Seats" value={house.seats} />
              <Field label="Founded" value={house.founded} />
              <LinkField
                label="Founder"
                items={[characterLink(house.founder)]}
                onSelect={onSelect}
              />
              <LinkField
                label="Current lord"
                items={[characterLink(house.currentLord)]}
                onSelect={onSelect}
              />
              <LinkField label="Heir" items={[characterLink(house.heir)]} onSelect={onSelect} />
              <LinkField
                label="Overlord"
                items={[houseLink(house.overlord)]}
                onSelect={onSelect}
              />
              <LinkField
                label="Cadet branches"
                items={house.cadetBranches.map(houseLink)}
                onSelect={onSelect}
              />
              <Field label="Ancestral weapons" value={house.ancestralWeapons} />

              {members.length > 0 && (
                <div className="field sworn-members">
                  <dt>Sworn members ({members.length})</dt>
                  <dd>
                    <ul>
                      {memberUrls.map((memberUrl, index) => (
                        <li key={memberUrl}>
                          <button
                            type="button"
                            className="panel-link"
                            onClick={() => onSelect({ type: 'character', url: memberUrl })}
                          >
                            {memberCharacters[index]
                              ? displayName(memberCharacters[index])
                              : '…'}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <Pager
                      page={page}
                      pageCount={Math.ceil(members.length / MEMBERS_PER_PAGE)}
                      onChange={setPage}
                      label="Sworn member pages"
                    />
                  </dd>
                </div>
              )}
            </dl>
          </>
        )
      )}
    </Panel>
  )
}

export default HousePanel
