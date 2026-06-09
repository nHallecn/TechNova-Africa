import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import GlobeCanvas from '../three/GlobeCanvas'
import { ArrowRight, Play } from 'lucide-react'

export default function HeroSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-eyebrow', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      gsap.fromTo('.hero-word', { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07, delay: 0.2 })
      gsap.fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7 })
      gsap.fromTo('.hero-ctas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.9 })
      gsap.fromTo('.hero-stats .stat', { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 1.1 })
      gsap.fromTo('.hero-globe', { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out', delay: 0.3 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef}>
      {/* Subtle grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, var(--text) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="grid lg:grid-cols-2 gap-8 container mx-auto px-5 2xl:px-0 items-center w-full lg:min-h-screen">
        {/* Left */}
        <div className="col-center lg:items-start text-center lg:text-left pt-8 lg:pt-0">
          <p className="hero-eyebrow opacity-0">New — TechNova Nova S25 Ultra</p>

          <h1 className="opacity-0">
            {'Innovation For'.split(' ').map((w, i) => (
              <span key={i} className="hero-word inline-block overflow-hidden mr-[0.25em]">{w}</span>
            ))}
            <span className="block">
              {'Africa.'.split('').map((ch, i) => (
                <span key={i} className="hero-word inline-block overflow-hidden text-brand-gradient">{ch}</span>
              ))}
            </span>
          </h1>

          <p className="hero-sub opacity-0">
            Cutting-edge technology designed for every corner of Africa. Experience the future of mobile, home, and life.
          </p>

          <div className="hero-ctas opacity-0">
            <button className="btn-primary flex items-center gap-2">
              Shop Now <ArrowRight size={15} />
            </button>
            <button className="btn-ghost flex items-center gap-2">
              <Play size={13} fill="currentColor" /> Watch Film
            </button>
          </div>

          <div className="hero-stats flex gap-10 justify-center lg:justify-start mt-10">
            {[['50+','Countries'], ['10M+','Customers'], ['#1','Africa 2025']].map(([v, l]) => (
              <div key={l} className="stat text-center lg:text-left opacity-0">
                <div className="stat-val">{v}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Globe */}
        <div className="hero-globe relative h-64 lg:h-[80vh] max-h-[640px] opacity-0">
          <GlobeCanvas />
          {/* Floating tags */}
          <FloatingTag style={{ top: '18%', left: '2%' }} label="Nova S25 Ultra" sub="Just launched" />
          <FloatingTag style={{ bottom: '28%', right: '0%' }} label="Africa-first 5G" sub="50+ countries" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 col-center gap-1.5 opacity-40">
        <span className="font-regular text-xs" style={{ color: 'var(--text-muted)' }}>Scroll</span>
        <div className="w-px h-8 animate-pulse" style={{ background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
      </div>
    </section>
  )
}

function FloatingTag({ style, label, sub }) {
  return (
    <div className="absolute hidden lg:flex flex-col gap-0.5 px-4 py-2.5 rounded-2xl text-left"
      style={{ ...style, backgroundColor: 'color-mix(in srgb, var(--bg-card) 85%, transparent)',
        backdropFilter: 'blur(12px)', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <span className="font-semibold text-xs" style={{ color: 'var(--text)' }}>{label}</span>
      <span className="font-regular text-[10px]" style={{ color: 'var(--text-muted)' }}>{sub}</span>
    </div>
  )
}
