import './Pager.css'

function Pager({ page, pageCount, onChange, label = 'Pages' }) {
  if (pageCount <= 1) return null

  return (
    <nav className="pager" aria-label={label}>
      <button type="button" onClick={() => onChange(page - 1)} disabled={page === 0}>
        ← Prev
      </button>
      <span>
        Page {page + 1} of {pageCount}
      </span>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount - 1}
      >
        Next →
      </button>
    </nav>
  )
}

export default Pager
