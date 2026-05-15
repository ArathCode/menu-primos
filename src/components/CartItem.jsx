function CartItem({ item, formatCurrency, onDecrease, onIncrease, onRemove }) {
  return (
    <div className="modal-item">
      <div className="modal-item-product">
        <button
          onClick={() => onRemove(item.platillo)}
          className="btn-remove cart-remove-all"
          type="button"
          aria-label={`Eliminar todas las unidades de ${item.platillo}`}
          title="Eliminar producto"
        >
          <i className="bi bi-trash3" aria-hidden="true"></i>
        </button>
        <div className="modal-item-info">
          <div className="modal-item-name">{item.platillo}</div>
          <div className="modal-item-details">
            {formatCurrency(item.precio)} x {item.cantidad} = {formatCurrency(item.precio * item.cantidad)}
          </div>
        </div>
      </div>
      <div className="modal-item-controls">
        <button onClick={() => onDecrease(item.platillo)} className="qty-btn" type="button" aria-label={`Quitar uno de ${item.platillo}`}>
          <i className="bi bi-dash-lg" aria-hidden="true"></i>
        </button>
        <span className="qty-display">{item.cantidad}</span>
        <button onClick={() => onIncrease(item.platillo)} className="qty-btn" type="button" aria-label={`Agregar uno de ${item.platillo}`}>
          <i className="bi bi-plus-lg" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  )
}

export default CartItem
