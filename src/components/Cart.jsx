import { useState } from 'react'

function Cart({ cart, cartCount, totalPrice, formatCurrency, isVisible, onDecrease, onIncrease, onRemove, onOpenModal }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const visibleItems = [...cart].reverse()

  return (
    <aside
      className={`order-panel ${cartCount > 0 ? 'has-items' : ''} ${isVisible ? 'is-visible' : ''} ${isCollapsed ? 'is-collapsed' : ''}`}
      aria-label="Resumen de pedido"
    >
      <button
        className="order-panel-toggle"
        type="button"
        onClick={() => setIsCollapsed(current => !current)}
        aria-label={isCollapsed ? 'Mostrar resumen de pedido' : 'Ocultar resumen de pedido'}
        aria-expanded={!isCollapsed}
      >
        <i className={`bi ${isCollapsed ? 'bi-chevron-up' : 'bi-chevron-down'}`} aria-hidden="true"></i>
      </button>

      <div className="order-panel-head">
        <span>Tu pedido</span>
        <div className="order-summary-pill">
          <strong>{cartCount}</strong>
          <strong className="cart-total-mobile">{formatCurrency(totalPrice)}</strong>
        </div>
      </div>

      <div className="order-panel-details">
        {cartCount > 0 ? (
          <div className="cart-preview-list">
            {visibleItems.map(item => (
              <div className="cart-preview-item" key={item.platillo}>
                <div className="cart-preview-product">
                  <button
                    className="cart-remove-all"
                    type="button"
                    onClick={() => onRemove(item.platillo)}
                    aria-label={`Eliminar todas las unidades de ${item.platillo}`}
                    title="Eliminar producto"
                  >
                    <i className="bi bi-trash3" aria-hidden="true"></i>
                  </button>
                  <div className="cart-preview-copy">
                    <strong>{item.platillo}</strong>
                    <span>{item.cantidad} x {formatCurrency(item.precio)}</span>
                  </div>
                </div>
                <div className="cart-preview-controls">
                  <button type="button" onClick={() => onDecrease(item.platillo)} aria-label={`Quitar uno de ${item.platillo}`}>
                    <i className="bi bi-dash-lg" aria-hidden="true"></i>
                  </button>
                  <span>{item.cantidad}</span>
                  <button type="button" onClick={() => onIncrease(item.platillo)} aria-label={`Agregar uno de ${item.platillo}`}>
                    <i className="bi bi-plus-lg" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-cart">Agrega productos para armar tu mensaje de WhatsApp.</p>
        )}
      </div>

      <button className="whatsapp-btn" type="button" onClick={onOpenModal} disabled={cartCount === 0}>
        <i className="bi bi-whatsapp" aria-hidden="true"></i>
        <span className="whatsapp-label-full">Enviar pedido</span>
        <span className="whatsapp-label-short">Enviar</span>
      </button>
    </aside>
  )
}

export default Cart
