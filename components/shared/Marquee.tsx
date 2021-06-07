import { useRef } from 'react'

import useIntersectionObserver from '@/lib/useIntersectionObserver'

interface Props {
  background: 'bg-primary' | 'bg-secondary'
}

const Marquee: React.FC<Props> = ({ children, background }) => {
  const containerRef = useRef<HTMLElement | null>(null)
  const inView = useIntersectionObserver(containerRef, { threshold: 0.2 })

  return (
    <section
      ref={(el) => (containerRef.current = el)}
      className={`h-80 overflow-hidden relative ${background}`}
    >
      <div
        className={`w-[200%] h-full flex absolute left-0 ${
          inView ? 'animate-marquee' : ''
        }`}
      >
        <div className="w-1/2 flex justify-around">{children}</div>
        <div className="w-1/2 flex justify-around">{children}</div>
      </div>
    </section>
  )
}

export default Marquee
