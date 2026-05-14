import { useState } from 'react'
import menuData from './data/menu_primos.json'
import './App.css'
import Header from './components/Header'
import Menu from './components/Menu'
import Cart from './components/Cart'
import OrderSummary from './components/OrderSummary'

function App() {
  const [openCategory, setOpenCategory] = useState(null)
  const [cart, setCart] = useState([])
  const [showModal, setShowModal] = useState(false)

  const categories = Object.keys(menuData.menu).map(key => ({
    key,
    label: formatCategoryName(key),
    products: menuData.menu[key]
  }))

  function formatCategoryName(key) {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, letter => letter.toUpperCase())
  }

  const toggleCategory = (categoryKey) => {
    setOpenCategory(prev => prev === categoryKey ? null : categoryKey)
  }

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.platillo === product.platillo)
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.platillo === product.platillo
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, cantidad: 1 }])
    }
  }

  const removeFromCart = (platillo) => {
    setCart(cart.filter(item => item.platillo !== platillo))
  }

  const decreaseQuantity = (platillo) => {
    setCart(cart.map(item =>
      item.platillo === platillo && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    ).filter(item => item.cantidad > 0))
  }

  const increaseQuantity = (platillo) => {
    setCart(cart.map(item =>
      item.platillo === platillo
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    ))
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)

  const sendOrderToWhatsApp = () => {
    const phoneNumber = '5212481557389' // Reemplaza con tu número de WhatsApp
    const resumen = cart
      .map(item => `- ${item.platillo} x${item.cantidad}: $${item.precio * item.cantidad}`)
      .join('\n')

    const mensaje = encodeURIComponent(`Hola, quiero ordenar:\n${resumen}\nTotal: $${totalPrice}`)
    window.open(`https://wa.me/${phoneNumber}?text=${mensaje}`, '_blank')
  }

  return (
    <div className="container">
      <Header />

      <main className="main">
        <Menu 
          categories={categories}
          openCategory={openCategory}
          onToggleCategory={toggleCategory}
          onAddToCart={addToCart}
        />
      </main>

      {cart.length > 0 && (
        <Cart 
          cartCount={cart.length}
          onOpenModal={() => setShowModal(true)}
        />
      )}

      <OrderSummary
        isOpen={showModal}
        cart={cart}
        totalPrice={totalPrice}
        onClose={() => setShowModal(false)}
        onDecrease={decreaseQuantity}
        onIncrease={increaseQuantity}
        onRemove={removeFromCart}
        onConfirm={sendOrderToWhatsApp}
      />
    </div>
  )
}

export default App
