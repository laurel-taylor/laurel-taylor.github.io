import './Skeleton.css'

function Skeleton({ rows = 6, className = '' }) {
  return (
    <div className={`skeleton ${className}`.trim()} aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="skeleton-row" />
      ))}
    </div>
  )
}

export default Skeleton
