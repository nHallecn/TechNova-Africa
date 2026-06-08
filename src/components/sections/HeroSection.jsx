import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import GlobeCanvas from '../three/GlobeCanvas'
import ParticleField from '../three/ParticleField'
import Button from '../ui/Button'
import { ArrowRight, Play } from 'lucide-react'

export default function HeroSection() {
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const badgeRef = useRef(null)
  const globeWrapRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(badgeRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(headingRef.current.querySelectorAll('.word'), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, '-=0.2')
      .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .fromTo(globeWrapRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, '-=0.8')
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <ParticleField count={100} />
      </div>

      {/* Gradient backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 dark:opacity-30 bg-[var(--color-brand)]" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full blur-3xl opacity-15 dark:opacity-25 bg-[var(--color-accent)]" />
      </div>

      <div className="container mx-auto px-5 2xl:px-0 relative z-10 pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen lg:min-h-0 lg:h-screen">

          {/* Left: Text content */}
          <div className="col-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 opacity-0
              bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]
              text-[var(--color-brand)] dark:text-[var(--color-accent)]
              border border-[var(--color-border)] dark:border-[var(--color-dark-border)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              New — TechNova Nova S25 Ultra is here
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="font-black text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight text-[var(--color-text)] dark:text-[var(--color-dark-text)] mb-6"
            >
              {'Innovation\nFor Africa.'.split('\n').map((line, li) => (
                <span key={li} className="block overflow-hidden">
                  {line.split(' ').map((w, wi) => (
                    <span key={wi} className="word inline-block mr-[0.25em] opacity-0">
                      {li === 0 ? (
                        <span className="text-brand-gradient">{w}</span>
                      ) : w === 'Africa.' ? (
                        <span>{w}</span>
                      ) : w}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p
              ref={subRef}
              className="text-lg lg:text-xl text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] max-w-md mb-10 leading-relaxed opacity-0"
            >
              Cutting-edge technology designed for every corner of Africa. Experience the future of mobile, home, and life.
            </p>

            {/* CTA group */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center lg:justify-start opacity-0">
              <Button size="lg">
                Shop Now <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                <Play size={14} className="mr-2" fill="currentColor" />
                Watch Film
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              {[
                { val: '50+', label: 'Countries served' },
                { val: '10M+', label: 'Happy customers' },
                { val: '#1', label: 'In Africa 2025' },
              ].map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="font-black text-2xl text-[var(--color-text)] dark:text-[var(--color-dark-text)]">{s.val}</div>
                  <div className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Globe */}
          <div ref={globeWrapRef} className="relative h-72 lg:h-screen max-h-[700px] flex items-center justify-center opacity-0">
            <div className="relative w-full h-full max-w-lg mx-auto">
              <GlobeCanvas />
              {/* Floating product callouts */}
              <FloatingTag top="20%" left="5%" label="Nova S25 Ultra" sub="Just launched" />
              <FloatingTag bottom="30%" right="0%" label="Africa-first 5G" sub="50+ countries" />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--color-text-muted)] to-transparent animate-pulse" />
      </div>
    </section>
  )
}

function FloatingTag({ top, left, right, bottom, label, sub }) {
  return (
    <div
      className="absolute z-20 hidden lg:flex flex-col gap-0.5 px-4 py-2.5 rounded-2xl
        bg-white/80 dark:bg-black/60 backdrop-blur-md
        border border-[var(--color-border)] dark:border-[var(--color-dark-border)]
        shadow-lg text-left"
      style={{ top, left, right, bottom }}
    >
      <span className="text-xs font-bold text-[var(--color-text)] dark:text-[var(--color-dark-text)]">{label}</span>
      <span className="text-[10px] text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">{sub}</span>
    </div>
  )
}
