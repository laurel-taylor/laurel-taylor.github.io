import { useQueries, useQuery } from '@tanstack/react-query'
import {
  fetchBooks,
  fetchCharacter,
  fetchHouse,
  idFromUrl,
} from '../api/iceAndFire'

// The API data never changes, so nothing needs to go stale.
const FOREVER = { staleTime: Infinity, gcTime: Infinity }

export function useBooks() {
  return useQuery({ queryKey: ['books'], queryFn: fetchBooks, ...FOREVER })
}

function characterQuery(url) {
  return {
    queryKey: ['character', idFromUrl(url)],
    queryFn: () => fetchCharacter(url),
    ...FOREVER,
  }
}

// A book lists its characters as URLs, one request each, so we only ever fetch
// the page of characters currently on screen.
export function useCharacters(urls) {
  return useQueries({
    queries: urls.map(characterQuery),
    combine: (results) => ({
      characters: results.map((result) => result.data),
      isPending: results.some((result) => result.isPending),
      error: results.find((result) => result.error)?.error,
    }),
  })
}

// Shares a query key with useCharacters, so opening the panel is a cache hit.
export function useCharacter(url) {
  return useQuery({ ...characterQuery(url ?? ''), enabled: Boolean(url) })
}

export function useHouses(urls) {
  return useQueries({
    queries: urls.map((url) => ({
      queryKey: ['house', idFromUrl(url)],
      queryFn: () => fetchHouse(url),
      ...FOREVER,
    })),
    combine: (results) => results.map((result) => result.data),
  })
}
