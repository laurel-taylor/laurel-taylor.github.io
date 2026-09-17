import { formatCents } from '../utils/money'
import DENOMINATIONS from './data/denominations'
import './CoinPanel.css'

function CoinPanel({ onInsert }) {
  return (
    <div className="coin-panel">
      <h2>Insert coins</h2>
      <div className="coin-buttons">
        {/* TODO: add coin buttons */}
      </div>
    </div>
  )
}

export default CoinPanel
