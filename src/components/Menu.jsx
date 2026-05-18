
import { useState, useEffect } from 'react';
import ProductItem from './ProductItem';

function Menu({ categories, onAddToCart, formatCurrency }) {
  const [expandedKey, setExpandedKey] = useState(null);

  // Comprimir imagen al cambiar de sección/categoría
  useEffect(() => {
    setExpandedKey(null);
  }, [categories]);

  if (!categories.length) {
    return <p className="empty-results">No encontramos platillos con esa búsqueda.</p>;
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
            {category.products.map(product => {
              const prodKey = `${category.key}-${product.platillo}`;
              return (
                <ProductItem
                  key={prodKey}
                  product={product}
                  onAddToCart={onAddToCart}
                  formatCurrency={formatCurrency}
                  expanded={expandedKey === prodKey}
                  onExpand={() => setExpandedKey(prodKey)}
                  onCompress={() => setExpandedKey(null)}
                />
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}

export default Menu
