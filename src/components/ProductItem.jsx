

import { useRef, useEffect } from 'react';

function ProductItem({ product, onAddToCart, formatCurrency, expanded, onExpand, onCompress }) {
  const imgSrc = product.image || product.imagen || product.img || null;
  const imageWrapperRef = useRef(null);
  const itemRef = useRef(null);

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (!expanded) {
      onExpand();
      setTimeout(() => {
        if (itemRef.current) {
          itemRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }, 40); 
    }
  };

  const handlePointerDown = (e) => {
  };

  useEffect(() => {
    if (!expanded) return;
    const node = itemRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          onCompress();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [expanded, onCompress]);

  return (
    <div
      className="menu-item"
      ref={itemRef}
      tabIndex={-1}
    >
      <div
        className={`item-image-wrapper${expanded ? ' expanded' : ''}`}
        ref={imageWrapperRef}
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      >
        {imgSrc ? (
          <img src={imgSrc} alt={product.platillo} className="item-image" />
        ) : null}
      </div>

      <h3 className="item-name">{product.platillo}</h3>
      <strong className="item-price">{formatCurrency(product.precio)}</strong>
      <button
        className="add-btn"
        type="button"
        onClick={e => {
          e.stopPropagation();
          if (!expanded) {
            onExpand();
            setTimeout(() => {
              if (itemRef.current) {
                itemRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              }
            }, 40);
          }
          onAddToCart(product);
        }}
        aria-label={`Agregar ${product.platillo}`}
      >
        <i className="bi bi-plus-lg" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default ProductItem
