function ProductItem({ product, onAddToCart, formatCurrency }) {
  const imgSrc = product.image || product.imagen || product.img || null

  return (
    <div className="menu-item">
      <div className="item-image-wrapper">
        {imgSrc ? (
          <img src={imgSrc} alt={product.platillo} className="item-image" />
        ) : null}
      </div>

      <h3 className="item-name">{product.platillo}</h3>
      <strong className="item-price">{formatCurrency(product.precio)}</strong>
      <button className="add-btn" type="button" onClick={() => onAddToCart(product)} aria-label={`Agregar ${product.platillo}`}>
        <i className="bi bi-plus-lg" aria-hidden="true"></i>
      </button>
    </div>
  )
}

export default ProductItem
