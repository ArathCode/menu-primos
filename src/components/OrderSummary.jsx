import CartItem from './CartItem'

function OrderSummary({ 
  isOpen, 
  cart, 
  totalPrice, 
  onClose, 
  onDecrease, 
  onIncrease, 
  onRemove, 
  onConfirm 
}) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Resumen de tu Orden</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-content">
          {cart.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
              onRemove={onRemove}
            />
          ))}
        </div>

        <div className="modal-total">
          <div className="total-row">
            <span>Total:</span>
            <span className="total-amount">${totalPrice}</span>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-confirm" onClick={onConfirm}>
            Confirmar Orden
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
