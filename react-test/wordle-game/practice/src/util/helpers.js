import { dayLibrary } from '../data/library'

export function evaluateGuess(tiles, answer) {
    const letters = tiles.map((tile) => tile.letter)
    const statuses = Array(5).fill('wrong')
    const remaining = {}
    console.log('remaining:', remaining)

    // for marking green tiles
    for (let i = 0; i < 5; i++) {
        if (letters[i] === answer[i]) {
        statuses[i] = 'green'
        } else {
        remaining[answer[i]] = (remaining[answer[i]] ?? 0) + 1
        }
    }

    // for marking yellow tiles
    for (let i = 0; i < 5; i++) {
        if (statuses[i] === 'green') continue
        if (remaining[letters[i]]) {
        statuses[i] = 'yellow'
        remaining[letters[i]]--
        }
    }

    return tiles.map((tile, i) => ({ letter: tile.letter, status: statuses[i] }))
}

export function getTodayWord() {
    const today = new Date()
    const sinceDate = new Date('2026-09-18');
    const daysSince = Math.floor((today - sinceDate) / (1000 * 60 * 60 * 24))
    const word = Array.from(dayLibrary)[daysSince % dayLibrary.size].toLowerCase()
    console.log('word:', word)
    return word
}
