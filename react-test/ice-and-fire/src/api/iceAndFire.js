const BASE_URL = 'https://anapioficeandfire.com/api'

// The API is versioned through the Accept header rather than the URL.
const HEADERS = { Accept: 'application/vnd.anapioficeandfire+json; version=1' }

async function request(url) {
  const response = await fetch(url, { headers: HEADERS })
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} — ${url}`)
  }
  return response.json()
}

// There are only 12 books, so a single large page avoids paging entirely.
export function fetchBooks() {
  return request(`${BASE_URL}/books?pageSize=50`)
}

export function fetchCharacter(url) {
  return request(url)
}

export function fetchHouse(url) {
  return request(url)
}

export function idFromUrl(url) {
  return url.split('/').pop()
}

export function displayName(character) {
  if (!character) return 'Unknown'
  return character.name || character.aliases?.find(Boolean) || 'Unnamed character'
}
