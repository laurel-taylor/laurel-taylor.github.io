import './Actions.css'

function Actions({ onVend, onReturnCoins }) {
  return (
    <div className="actions">
      <button type="button" className="action-button vend" onClick={onVend}>
        Vend
      </button>
      <button type="button" className="action-button refund" onClick={onReturnCoins}>
        Return coins
      </button>
    </div>
  )
}

export default Actions
