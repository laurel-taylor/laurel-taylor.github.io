import { formatCents } from '../utils/money'
import './Display.css'

function Display({ balance, message }) {
  return (
    <div className="display">
      <div className="display-balance">
        <span className="display-label">Balance</span>
        <span className="display-amount">{/* TODO: add balance */}</span>
      </div>
      <p className="display-message">{/* TODO: add message */}</p>
    </div>
  )
}

export default Display
