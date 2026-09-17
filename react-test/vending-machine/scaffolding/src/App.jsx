/* Fill in the TODOs below; the unused setters and handler args are for you to use. */
import { useState } from 'react'
import PRODUCTS from './data/products'
import DENOMINATIONS from './data/denominations'
import ProductGrid from './components/ProductGrid'
import CoinPanel from './components/CoinPanel'
import Display from './components/Display'
import Actions from './components/Actions'
import './App.css'

function App() {
  const [inventory, setInventory] = useState(PRODUCTS)
  const [balance, setBalance] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [message, setMessage] = useState('Insert coins and pick a snack.')

  function insertCoin(cents) {
    // TODO: increase the inserted balance
  }

  function selectProduct(id) {
    // TODO: select one product at a time
  }

  function vend() {
    // TODO: vend the selected product
  }

  function returnCoins() {
    // TODO: refund the balance
  }

  return (
    <div className="machine">
      <h1>Vending Machine</h1>
      <Display balance={balance} message={message} />
      <ProductGrid products={inventory} selectedId={selectedId} onSelect={selectProduct} />
      <div className="machine-controls">
        <CoinPanel onInsert={insertCoin} />
        <Actions onVend={vend} onReturnCoins={returnCoins} />
      </div>
    </div>
  )
}

export default App
