import { useEffect, useState } from 'react'

export function useMenuScroll(filteredCategories) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [isMenuInView, setIsMenuInView] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const sections = [...document.querySelectorAll('[data-menu-section]')]
      const menuShell = document.getElementById('menu')
      const menuRect = menuShell?.getBoundingClientRect()
      const anchorY = window.innerHeight * 0.38
      let bestIndex = 0
      let bestDistance = Number.POSITIVE_INFINITY

      if (menuRect) {
        setIsMenuInView(menuRect.top <= window.innerHeight * 0.42 && menuRect.bottom >= window.innerHeight * 0.2)
      }

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const distance = Math.abs(rect.top - anchorY)
        if (rect.top <= window.innerHeight * 0.65 && rect.bottom >= window.innerHeight * 0.2 && distance < bestDistance) {
          bestIndex = index
          bestDistance = distance
        }
      })

      setCurrentSectionIndex(bestIndex)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [filteredCategories])

  return { currentSectionIndex, setCurrentSectionIndex, isMenuInView }
}
