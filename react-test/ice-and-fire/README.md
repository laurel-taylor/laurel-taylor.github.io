# Ice and Fire

This is a React application that uses the Ice and Fire API to fetch data about the characters in the Game of Thrones books.

The problem here is that the Ice and Fire series has a lot of characters, but the API needs a separate request for each character to display even their name.
Using TanStack Query helps solve this problem - it caches character information and only fetches for characters that are not already in the cache.

## Features

- Fetch data about the books in the Ice & Fire series
- Display the characters in a book on a paginated list
- Display character details in a panel
- Uses Tanstack Query to fetch data and cache it

# Install

```bash
npm install
```

# Run

```bash
npm run dev
```

# Build

```bash
npm run build
```

# About
Written with help from Cursor and Claude Opus 5 (Sept 2026).
