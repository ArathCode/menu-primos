import ProductItem from './ProductItem'

function Menu({ categories, onAddToCart, formatCurrency }) {
  if (!categories.length) {
    return <p className="empty-results">No encontramos platillos con esa búsqueda.</p>
  }

  return (
    <div className="menu-results">
      {categories.map(category => (
        <article className="menu-category" id={`section-${category.key}`} data-menu-section={category.key} key={category.key}>
          <header className="category-title">
            <h2>{category.label}</h2>
            <span>{category.products.length} opciones</span>
          </header>
          <div className="menu-items">
            {category.products.map(product => (
              <ProductItem
                key={`${category.key}-${product.platillo}`}
                product={product}
                onAddToCart={onAddToCart}
                formatCurrency={formatCurrency}
              />
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

export default Menu
