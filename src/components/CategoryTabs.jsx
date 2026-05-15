function CategoryTabs({ filteredCategories, currentSectionIndex, scrollToCategory }) {
  return (
    <div className="category-tabs" aria-label="Categorías del menú">
      <button
        className={`category-tab ${currentSectionIndex === 0 ? 'is-active' : ''}`}
        type="button"
        onClick={() => scrollToCategory('all')}
      >
        Todo
      </button>
      {filteredCategories.map((category, index) => (
        <button
          className={`category-tab ${currentSectionIndex === index ? 'is-active' : ''}`}
          type="button"
          key={category.key}
          onClick={() => scrollToCategory(category.key)}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs;
