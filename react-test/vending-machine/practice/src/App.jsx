/* Fill in the TODOs below; the unused setters and handler args are for you to use. */
/* eslint-disable no-unused-vars */
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
    // TODO:
    // - no selection → status message, nothing else changes
    // - out of stock → status message
    // - not enough money → status message
    // - success → decrement stock, reduce balance by price, show leftover balance as change
  }

  function returnCoins() {
    // TODO: refund the full inserted balance, clear selection, show how much was returned
  }

  return (
    <div className="machine">
      <h1>Vending Machine</h1>
      <Display balance={balance} message={message} />
      <ProductGrid products={inventory} selectedId={selectedId} onSelect={selectProduct} />
      <div className="machine-controls">
        <CoinPanel denominations={DENOMINATIONS} onInsert={insertCoin} />
        <Actions onVend={vend} onReturnCoins={returnCoins} />
      </div>
    </div>
  )
}

export default App
