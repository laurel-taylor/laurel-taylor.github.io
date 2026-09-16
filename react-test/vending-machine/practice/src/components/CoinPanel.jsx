import { formatCents } from '../utils/money'
import './CoinPanel.css'

function CoinPanel({ denominations, onInsert }) {
  return (
    <div className="coin-panel">
      <h2>Insert coins</h2>
      <div className="coin-buttons">
        {denominations.map((denomination) => (
          <button
            key={denomination.cents}
            type="button"
            className="coin-button"
            onClick={() => onInsert(denomination.cents)}
          >
            <span className="coin-label">{denomination.label}</span>
            <span className="coin-value">{formatCents(denomination.cents)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CoinPanel
