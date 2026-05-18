function MobileSectionNav({ isMenuInView, currentSectionIndex, filteredCategories, scrollToSection }) {
  return (
    <div className={`mobile-section-nav ${isMenuInView ? 'is-visible' : ''}`} aria-label="Navegación entre secciones del menú">
      <button
        className={`mobile-section-up ${!isMenuInView || currentSectionIndex <= 0 ? 'is-disabled' : ''}`}
        type="button"
        aria-label="Subir a la sección anterior"
        onClick={() => scrollToSection(currentSectionIndex - 1)}
      >
        <i className="bi bi-arrow-up-short" aria-hidden="true"></i>
      </button>
      <div className="mobile-section-next-wrapper">
        {isMenuInView && currentSectionIndex < filteredCategories.length - 1 && (
          <span className="mobile-section-next-label">
            {filteredCategories[currentSectionIndex + 1]?.label}
          </span>
        )}
        <button
          className={`mobile-section-next ${!isMenuInView || currentSectionIndex >= filteredCategories.length - 1 ? 'is-disabled' : ''}`}
          type="button"
          aria-label="Bajar a la siguiente sección"
          onClick={() => scrollToSection(currentSectionIndex + 1)}
        >
          <i className="bi bi-arrow-down-short" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  )
}

export default MobileSectionNav;
