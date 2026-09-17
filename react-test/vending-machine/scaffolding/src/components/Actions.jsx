import './Actions.css'

function Actions({ onVend, onReturnCoins }) {
  return (
    <div className="actions">
      <button type="button" className="action-button vend">
        Vend
      </button>
      <button type="button" className="action-button refund">
        Return coins
      </button>
    </div>
  )
}

export default Actions
