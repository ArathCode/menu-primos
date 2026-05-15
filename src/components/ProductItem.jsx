function ProductItem({ product, onAddToCart, formatCurrency }) {
  return (
    <div className="menu-item">
      <h3 className="item-name">{product.platillo}</h3>
      <strong className="item-price">{formatCurrency(product.precio)}</strong>
      <button className="add-btn" type="button" onClick={() => onAddToCart(product)} aria-label={`Agregar ${product.platillo}`}>
        <i className="bi bi-plus-lg" aria-hidden="true"></i>
      </button>
    </div>
  )
}

export default ProductItem
