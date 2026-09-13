import { Fragment, useEffect } from 'react'
import ScrollContainer from './ScrollContainer'
import './Panel.css'

export function Field({ label, value, showEmpty }) {
  const values = (Array.isArray(value) ? value : [value]).filter(Boolean)
  if (values.length === 0 && !showEmpty) return null

  return (
    <div className="field">
      <dt>{label}</dt>
      <dd>{values.length > 0 ? values.join(', ') : 'None'}</dd>
    </div>
  )
}

// Values that are records in their own right. Each item is { type, url, name },
// and selecting one swaps the panel over to that record.
export function LinkField({ label, items, onSelect }) {
  const links = items.filter((item) => item?.url)
  if (links.length === 0) return null

  return (
    <div className="field">
      <dt>{label}</dt>
      <dd>
        {links.map((item, index) => (
          <Fragment key={item.url}>
            {index > 0 && ', '}
            <button type="button" className="panel-link" onClick={() => onSelect(item)}>
              {item.name}
            </button>
          </Fragment>
        ))}
      </dd>
    </div>
  )
}

// Shared shell for the character and house panels: nav row, Escape to close,
// and the scrolling body.
function Panel({ ariaLabel, onBack, onClose, children }) {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <ScrollContainer
      as="aside"
      className="detail-panel"
      aria-label={ariaLabel}
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
      {children}
    </ScrollContainer>
  )
}

export default Panel
