function ProductItem({ product, onAddToCart }) {
  return (
    <div className="product-item">
      <div className="product-info">
        <div className="product-name">{product.platillo}</div>
        <div className="product-price">${product.precio}</div>
      </div>
      <button
        className="btn-order"
        onClick={() => onAddToCart(product)}
      >
        Ordenar
      </button>
    </div>
  )
}

export default ProductItem
