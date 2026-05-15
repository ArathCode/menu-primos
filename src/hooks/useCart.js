import { useState, useMemo } from 'react'

export function useCart() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.platillo === product.platillo)
      if (existing) {
        return prev.map(item => item.platillo === product.platillo ? { ...item, cantidad: item.cantidad + 1 } : item)
      }
      return [...prev, { ...product, cantidad: 1 }]
    })
  }

  const removeFromCart = (platillo) => {
    setCart(prev => prev.filter(item => item.platillo !== platillo))
  }

  const decreaseQuantity = (platillo) => {
    setCart(prev => prev
      .map(item => item.platillo === platillo ? { ...item, cantidad: item.cantidad - 1 } : item)
      .filter(item => item.cantidad > 0))
  }

  const increaseQuantity = (platillo) => {
    setCart(prev => prev.map(item => item.platillo === platillo ? { ...item, cantidad: item.cantidad + 1 } : item))
  }

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.cantidad, 0), [cart])
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0), [cart])

  return {
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    totalItems,
    totalPrice,
    setCart,
  }
}
