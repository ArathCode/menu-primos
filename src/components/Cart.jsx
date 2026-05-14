function Cart({ cartCount, onOpenModal }) {
  return (
    <div className="cart-section">
      <div className="cart-header">
        <h3>Tu Orden ({cartCount} {cartCount === 1 ? 'item' : 'items'})</h3>
        <button className="btn-send-order" onClick={onOpenModal}>
          Enviar Orden
        </button>
      </div>
    </div>
  )
}

export default Cart
