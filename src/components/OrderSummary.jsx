import CartItem from './CartItem'

function OrderSummary({
  isOpen,
  cart,
  totalPrice,
  formatCurrency,
  onClose,
  onDecrease,
  onIncrease,
  onRemove,
  onConfirm,
}) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>Resumen de tu orden</h2>
          <button className="modal-close" onClick={onClose} type="button" aria-label="Cerrar">
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>

        <div className="modal-content">
          {cart.map(item => (
            <CartItem
              key={item.platillo}
              item={item}
              formatCurrency={formatCurrency}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
              onRemove={onRemove}
            />
          ))}
        </div>

        <div className="modal-total">
          <div className="total-row">
            <span>Total:</span>
            <span className="total-amount">{formatCurrency(totalPrice)}</span>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-confirm" onClick={onConfirm}>
            <i className="bi bi-whatsapp" aria-hidden="true"></i>
            Confirmar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
