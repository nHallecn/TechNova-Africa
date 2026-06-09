// Re-export GSAP hooks - components import useGSAP from @gsap/react directly
// This file kept for any custom hooks
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useFadeInUp(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { opacity: 0, y: options.y ?? 40 },
      {
        opacity: 1, y: 0,
        duration: options.duration ?? 0.9,
        ease: options.ease ?? 'power3.out',
        delay: options.delay ?? 0,
        scrollTrigger: {
          trigger: ref.current,
          start: options.start ?? 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])
  return ref
}

export function useStaggerReveal(selector = ':scope > *', options = {}) {
  const containerRef = useRef(null)
  useEffect(() => {
    if (!containerRef.current) return
    const children = containerRef.current.querySelectorAll(selector)
    gsap.fromTo(children,
      { opacity: 0, y: options.y ?? 50 },
      {
        opacity: 1, y: 0,
        duration: options.duration ?? 0.8,
        ease: options.ease ?? 'power3.out',
        stagger: options.stagger ?? 0.12,
        scrollTrigger: {
          trigger: containerRef.current,
          start: options.start ?? 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])
  return containerRef
}
