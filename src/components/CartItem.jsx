function CartItem({ item, onDecrease, onIncrease, onRemove }) {
  return (
    <div className="modal-item">
      <div className="modal-item-info">
        <div className="modal-item-name">{item.platillo}</div>
        <div className="modal-item-details">
          ${item.precio} × {item.cantidad} = ${item.precio * item.cantidad}
        </div>
      </div>
      <div className="modal-item-controls">
        <button onClick={() => onDecrease(item.platillo)} className="qty-btn">−</button>
        <span className="qty-display">{item.cantidad}</span>
        <button onClick={() => onIncrease(item.platillo)} className="qty-btn">+</button>
        <button onClick={() => onRemove(item.platillo)} className="btn-remove">🗑</button>
      </div>
    </div>
  )
}

export default CartItem
