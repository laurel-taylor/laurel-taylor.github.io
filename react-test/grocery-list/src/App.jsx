import { useState } from 'react'
import './App.css'
import List from './components/List'

function App() {
  const items = [
    { id: 1, name: 'Apple', icon: '🍎', price: 1.99 },
    { id: 2, name: 'Banana', icon: '🍌', price: 0.99 },
    { id: 3, name: 'Cherry', icon: '🍒', price: 2.99 },
  ]

  const [groceryList, setGroceryList] = useState([]);

  function addItem(item) {
    if (groceryList.find(i => i.id === item.id)) {
      setGroceryList(groceryList.map(i => i.id === item.id ? { ...i, count: i.count + 1 } : i));
    } else {
      setGroceryList([...groceryList, { ...item, count: 1 }]);
    }
  }

  function removeItem(item) {
    const groceryItem = groceryList.find(i => i.id === item.id);
    if (groceryItem) {
      if (groceryItem.count === 1) {
        setGroceryList(groceryList.filter(i => i.id !== item.id));
      } else {
        setGroceryList(groceryList.map(i => i.id === item.id ? { ...i, count: i.count - 1 } : i));
      }
    }
  }

  return (
    <>
      <div className="app">
        <div>
          <h1>Grocery List</h1>
          <List items={groceryList} onClickItem={item => removeItem(item)} />
          <div>Total: ${groceryList.reduce((acc, item) => acc + (item.count * item.price), 0).toFixed(2)}</div>
        </div>

        <div>
          <h1>Store</h1>
          <List items={items} onClickItem={item => addItem(item)} />
        </div>
      </div>
    </>
  )
}

export default App
