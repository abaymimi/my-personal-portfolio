export function smoothScrollTo(elementId: string) {
    const element = document.getElementById(elementId)
    if (!element) return
  
    const headerOffset = 80 // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset
  
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
  