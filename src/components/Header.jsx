import HeaderNav from './HeaderNav'

function Header() {
  return (
    <header className="topbar">
      <a className="brand-mini" href="#inicio" aria-label="Inicio">
        <span>Tacos Árabes</span>
        <strong>Los Primos</strong>
      </a>
      <HeaderNav />
    </header>
  )
}

export default Header
