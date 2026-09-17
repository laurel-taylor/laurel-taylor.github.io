import './Actions.css'

function Actions({ onVend, onReturnCoins, canVend, canReturnCoins }) {
  return (
    <div className="actions">
      <button type="button"
      className={`action-button vend${canVend ? '' : ' disabled'}`}
      disabled={!canVend}
      onClick={onVend}>
        Vend
      </button>
      <button
        type="button"
        className={`action-button refund${canReturnCoins ? '' : ' disabled'}`}
        onClick={onReturnCoins}
      >
        Return coins
      </button>
    </div>
  )
}

export default Actions
