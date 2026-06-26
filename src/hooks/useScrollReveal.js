import { useEffect, useRef, useState } from 'react'

export default function useScrollReveal(options = {}) {
  const { threshold = 0.15, triggerOnce = true } = options
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(node)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(node)

    return () => {
      observer.unobserve(node)
    }
  }, [threshold, triggerOnce])

  return { ref, isVisible }
}
