import { useBooks } from '../hooks/useIceAndFire'
import Skeleton from './Skeleton'
import './BookList.css'
import ScrollContainer from './ScrollContainer'

function BookList({ selectedBookUrl, onSelectBook }) {
  const { data: books, isPending, error } = useBooks()

  if (isPending) return <Skeleton rows={12} />
  if (error) return <p className="error">Could not load the books: {error.message}</p>

  return (
    <ScrollContainer
      as="nav"
      className="books"
      aria-label="Books"
      header={
        <>
          <h1>A Song of Ice and Fire</h1>
          <a
            className="about-link"
            href="https://github.com/laurel-taylor/laurel-taylor.github.io/blob/master/react-test/ice-and-fire/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </a>
        </>
      }
    >
      <ul className="book-list">
        {books.map(
          (book) =>
            book.characters.length > 0 && (
              <li key={book.url}>
                <button
                  type="button"
                  className={book.url === selectedBookUrl ? 'selected' : undefined}
                  aria-current={book.url === selectedBookUrl}
                  onClick={() => onSelectBook(book)}
                >
                  <span className="book-name">{book.name}</span>
                  <span className="book-meta">
                    {book.released.slice(0, 4)} · {book.characters.length} characters
                  </span>
                </button>
              </li>
            ),
        )}
      </ul>
    </ScrollContainer>
  )
}

export default BookList
