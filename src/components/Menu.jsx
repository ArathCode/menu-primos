import ProductItem from './ProductItem'

function Menu({ categories, openCategory, onToggleCategory, onAddToCart }) {
  return (
    <div className="accordion">
      {categories.map(category => (
        <div key={category.key} className="accordion-item">
          <button
            className={`accordion-header ${openCategory === category.key ? 'active' : ''}`}
            onClick={() => onToggleCategory(category.key)}
          >
            <span className="accordion-title">{category.label}</span>
            <span className="accordion-arrow">›</span>
          </button>

          {openCategory === category.key && (
            <div className="accordion-content">
              <div className="products-list">
                {category.products.map((product, index) => (
                  <ProductItem
                    key={index}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Menu
