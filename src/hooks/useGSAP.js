import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fade + slide up on scroll enter.
 * Returns a ref to attach to the element.
 */
export function useFadeInUp(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    gsap.fromTo(
      el,
      { opacity: 0, y: options.y ?? 40 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.9,
        ease: options.ease ?? 'power3.out',
        delay: options.delay ?? 0,
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return ref
}

/**
 * Staggered children animation.
 * Attach containerRef to the parent, children selector defaults to direct children.
 */
export function useStaggerReveal(selector = ':scope > *', options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const children = containerRef.current.querySelectorAll(selector)

    gsap.fromTo(
      children,
      { opacity: 0, y: options.y ?? 50 },
      {
        opacity: 1,
        y: 0,
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

/**
 * Horizontal scroll pinned section.
 */
export function useHorizontalScroll() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return

    const track = trackRef.current
    const totalWidth = track.scrollWidth - containerRef.current.offsetWidth

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return { containerRef, trackRef }
}
