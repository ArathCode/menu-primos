import { useEffect, useMemo, useState } from 'react'
import { useCart } from './hooks/useCart'
import { useMenuScroll } from './hooks/useMenuScroll'
import menuData from './data/menu_primos.json'
import './App.css'
import Header from './components/Header'
import Menu from './components/Menu'
import Cart from './components/Cart'
import OrderSummary from './components/OrderSummary'
import Background3D from './components/Background3D'
import logoImage from './assets/logo.png'
import troncoImage from './assets/tronco.png'
import videoPrimos from './assets/video_primos.mp4'
import { useRef } from 'react';
import { formatCurrency } from './utils/formatCurrency'
import { normalize } from './utils/normalize'
import CategoryTabs from './components/CategoryTabs'
import MobileSectionNav from './components/MobileSectionNav'

const categoryLabels = {
  del_trompo_al_pastor: 'Del trompo al pastor',
  del_trompo_arabe: 'Del trompo árabe',
  hamburguesas: 'Hamburguesas',
  de_la_parrilla: 'De la parrilla',
  x_kilo: 'X kilo',
  bebidas: 'Bebidas',
}



function App() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showModal, setShowModal] = useState(false)
  const [query, setQuery] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  const {
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    totalItems,
    totalPrice,
    setCart,
  } = useCart()

  const categories = useMemo(() => (
    Object.keys(menuData.menu).map(key => ({
      key,
      label: categoryLabels[key] || key.replace(/_/g, ' '),
      products: menuData.menu[key],
    }))
  ), [])

  const filteredCategories = useMemo(() => {
    const search = normalize(query)
    return categories
      .map(category => ({
        ...category,
        products: category.products.filter(product => normalize(product.platillo).includes(search)),
      }))
      .filter(category => category.products.length > 0)
  }, [categories, query])

  const {
    currentSectionIndex,
    setCurrentSectionIndex,
    isMenuInView,
  } = useMenuScroll(filteredCategories)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  const sendOrderToWhatsApp = () => {
    const phoneNumber = '522482080368'
    const resumen = cart
      .map(item => `- ${item.cantidad} x ${item.platillo} ($${item.precio} c/u)`)
      .join('\n')
    const mensaje = encodeURIComponent(`Hola, quiero hacer un pedido:\n\n${resumen}\n\nTotal: ${formatCurrency(totalPrice)}`)
    window.open(`https://wa.me/${phoneNumber}?text=${mensaje}`, '_blank')
  }


  const scrollToSection = (index) => {
    const sections = [...document.querySelectorAll('[data-menu-section]')]
    const target = sections[index]
    if (!target) return
    setCurrentSectionIndex(index)
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToCategory = (categoryKey) => {
    if (categoryKey === 'all') {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setCurrentSectionIndex(0)
      return
    }

    const index = filteredCategories.findIndex(category => category.key === categoryKey)
    if (index >= 0) scrollToSection(index)
  }


  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleMuteClick = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="app-shell">
      <div className={`loader ${isLoaded ? 'is-hidden' : ''}`} aria-label="Cargando menú">
        <div className="log-spinner" aria-hidden="true">
          <img
            src={troncoImage}
            alt="Cargando menú"
            className="loader-image"
          />
        </div>
        <p>Cargando menú</p>
      </div>

      <Background3D />

      <Header />

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <div className="logo-lockup" aria-label="Tacos Árabes Los Primos">
              <span className="logo-top">Servicio a domicilio gratis</span>
              <div className="logo-image-wrapper">
                <img
                  src={logoImage}
                  alt="Tacos Árabes Los Primos"
                  className="logo-image"
                />
              </div>
         
            </div>
            <p className="hero-sub">Del trompo, de la parrilla y por kilo. Preparado al instante que lo pides.</p>
          </div>

          <aside className="service-card">
            <span className="service-label">Pedidos</span>
            <a href="tel:+522482080368">248 208 03 68</a>
            <a href="tel:+522481918561">248 191 85 61</a>
            <p>@tacosarabelosprimos</p>
          </aside>

          <a className="hero-menu-cue" href="#menu" aria-label="Ver menú">
            <span>Ver Menú</span>
            <i className="bi bi-chevron-down" aria-hidden="true"></i>
          </a>
        </section>
        <section className="video-section" aria-label="Video promocional">
          <div className="video-wrapper" style={{position: 'relative'}}>
            <video
              ref={videoRef}
              src={videoPrimos}
              playsInline
              loop
              autoPlay
              muted={isMuted}
              className="responsive-video"
              onClick={handleVideoClick}
              style={{cursor: 'pointer'}}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <button
              className="video-mute-btn"
              type="button"
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              onClick={handleMuteClick}
              style={{
                position: 'absolute',
                top: 12,
                right: 18,
                zIndex: 2,
                background: 'none',
                border: 'none',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'none',
              }}
            >
              {isMuted ? (
                <i className="bi bi-volume-mute-fill video-mute-icon"></i>
              ) : (
                <i className="bi bi-volume-up-fill video-mute-icon"></i>
              )}
            </button>
          </div>
        </section>
        <section className="menu-shell" id="menu">
          <div className="menu-heading">
            <div>
              <p className="section-kicker">Menú interactivo</p>
              <h1>Elige tu orden</h1>
            </div>
            <label className="search-box">
              <span>Buscar</span>
              <input
                type="search"
                placeholder="Taco árabe, gringa, bebida..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>
          
          <CategoryTabs
            filteredCategories={filteredCategories}
            currentSectionIndex={currentSectionIndex}
            scrollToCategory={scrollToCategory}
          />

          <Menu categories={filteredCategories} onAddToCart={addToCart} formatCurrency={formatCurrency} />
        </section>

        
      </main>

      <Cart
        cart={cart}
        cartCount={totalItems}
        totalPrice={totalPrice}
        formatCurrency={formatCurrency}
        isVisible={isMenuInView}
        onDecrease={decreaseQuantity}
        onIncrease={increaseQuantity}
        onRemove={removeFromCart}
        onOpenModal={() => setShowModal(true)}
      />

      <MobileSectionNav
        isMenuInView={isMenuInView}
        currentSectionIndex={currentSectionIndex}
        filteredCategories={filteredCategories}
        scrollToSection={scrollToSection}
      />

      <OrderSummary
        isOpen={showModal}
        cart={cart}
        totalPrice={totalPrice}
        formatCurrency={formatCurrency}
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
