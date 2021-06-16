import { MutableRefObject, useEffect, useRef, useState } from 'react'

function useIntersectionObserver(
  ref: MutableRefObject<Element | null>,
  options: IntersectionObserverInit = {},
  forward = false
): boolean {
  const [element, setElement] = useState<Element | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)

  const cleanOb = () => {
    observer.current?.disconnect()
  }

  useEffect(() => {
    setElement(ref.current)
  }, [ref])

  useEffect(() => {
    if (!element) return
    cleanOb()

    observer.current = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting

        if (!forward) {
          setIsIntersecting(isElementIntersecting)
        } else if (forward && !isIntersecting && isElementIntersecting) {
          setIsIntersecting(isElementIntersecting)
          cleanOb()
        }
      },
      { ...options }
    )

    observer.current.observe(element)

    return () => {
      cleanOb()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element])

  return isIntersecting
}

export default useIntersectionObserver
