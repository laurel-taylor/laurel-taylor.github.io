import { formatCents } from '../utils/money'
import './ProductGrid.css'

function ProductGrid({ products, selectedId, onSelect }) {
  return (
    <div className="product-grid">
      {products.map((product) => {
        const soldOut = product.stock === 0
        const selected = product.id === selectedId

        return (
          <button
            key={product.id}
            type="button"
            className={`product-slot${selected ? ' selected' : ''}${soldOut ? ' sold-out' : ''}`}
            disabled={soldOut}
            onClick={() => onSelect(product.id)}
          >
            <span className="product-icon" aria-hidden="true">
              {product.icon}
            </span>
            <span className="product-name">{product.name}</span>
            <span className="product-price">{formatCents(product.price)}</span>
            <span className="product-stock">
              {soldOut ? 'Sold out' : `${product.stock} left`}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default ProductGrid
