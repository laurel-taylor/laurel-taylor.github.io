import { useState } from 'react'
import PRODUCTS from './data/products'
import DENOMINATIONS from './data/denominations'
import ProductGrid from './components/ProductGrid'
import CoinPanel from './components/CoinPanel'
import Display from './components/Display'
import Actions from './components/Actions'
import { formatCents, coinString } from './utils/money'
import './App.css'

function App() {
  const [inventory, setInventory] = useState(PRODUCTS)
  const [balance, setBalance] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [message, setMessage] = useState('Insert coins and pick a snack.')

  function insertCoin(cents) {
    setMessage(`Inserted ${formatCents(cents)}.`)
    setBalance(balance + cents);
  }

  function selectProduct(id) {
    const product = inventory.find(p => p.id === id);

    if (!product) {
      setMessage('How did you get here');
      return;
    }

    if (product.stock <= 0) {
      setMessage('That item is sold out. Pick a different product.');
      return;
    }

    if (product.price > balance) {
      const diff = product.price - balance;
      setMessage(`Insufficient funds. Insert ${formatCents(diff)} to get ${product.name}.`);
      return;
    }

    setMessage(`Click Vend to get your ${product.name}.`)
    setSelectedId(id);
  }

  function vend() {
    if (!selectedId) {
      setMessage('Select an item to vend.');
      return;
    }
    const product = inventory.find(p => p.id === selectedId);
    setInventory(() => {
      return inventory.map((item) => {
        return item.id === selectedId ? {
          ...item,
          stock: item.stock - 1,
        } : item
      });
    });
    setBalance(balance - product.price);
    setSelectedId(null);
    setMessage(`Enjoy your ${product.name}. Vend another item or return coins.`);
  }

  function returnCoins() {
    console.log('return coins');
    const coins = coinString(balance);
    setMessage(`${formatCents(balance)} returned. You got: ${coins}.`);
    setSelectedId(null);
    setBalance(0);
  }

  return (
    <div className="machine">
      <h1>Vending Machine</h1>
      <Display balance={balance} message={message} />
      <ProductGrid products={inventory} selectedId={selectedId} onSelect={selectProduct} />
      <div className="machine-controls">
        <CoinPanel denominations={DENOMINATIONS} onInsert={insertCoin} />
        <Actions onVend={vend} onReturnCoins={returnCoins} canVend={!!selectedId} canReturnCoins={balance > 0}/>
      </div>
    </div>
  )
}

export default App
