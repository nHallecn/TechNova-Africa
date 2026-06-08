import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFadeInUp, useStaggerReveal } from '../../hooks/useGSAP'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="currentColor" fillOpacity="0.15" />
        <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '2-Year Warranty',
    desc: 'Every device ships with a full manufacturer warranty and in-country service support.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="currentColor" fillOpacity="0.15" />
        <path d="M16 8v8l5 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Same-Day Delivery',
    desc: 'Order before noon in Yaoundé, Douala, Abidjan, Lagos and more for same-day delivery.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="currentColor" fillOpacity="0.15" />
        <rect x="10" y="12" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M13 12V10a3 3 0 016 0v2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Secure Payments',
    desc: 'MTN MoMo, Orange Money, Visa, Mastercard — all payments are encrypted and secure.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="currentColor" fillOpacity="0.15" />
        <path d="M8 20s2-3 8-3 8 3 8 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="16" cy="13" r="3" stroke="currentColor" strokeWidth="2.5"/>
      </svg>
    ),
    title: 'Local Support',
    desc: 'French and English customer support available 7 days a week via call, chat, and WhatsApp.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="currentColor" fillOpacity="0.15" />
        <path d="M12 20l-4-4 4-4M20 12l4 4-4 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Trade-In Program',
    desc: 'Trade in any working device and get up to XAF 200,000 off your upgrade instantly.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="currentColor" fillOpacity="0.15" />
        <path d="M16 10v2M16 20v2M10 16h2M20 16h2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2.5"/>
      </svg>
    ),
    title: 'Energy Efficient',
    desc: 'All appliances are rated A+ or above. Built for African voltage and climate conditions.',
  },
]

const COUNTRIES = [
  'Cameroon', 'Nigeria', 'Côte d\'Ivoire', 'Senegal', 'Ghana',
  'Kenya', 'Ethiopia', 'Tanzania', 'Uganda', 'Rwanda',
  'DR Congo', 'South Africa', 'Egypt', 'Morocco', 'Tunisia',
]

export default function WhySection() {
  const headingRef = useFadeInUp()
  const pillarsRef = useStaggerReveal('.pillar-item', { stagger: 0.08 })
  const countriesRef = useRef(null)

  // Countries ticker
  useEffect(() => {
    const el = countriesRef.current
    if (!el) return
    const tween = gsap.to(el, {
      x: '-50%',
      duration: 20,
      ease: 'none',
      repeat: -1,
    })
    return () => tween.kill()
  }, [])

  return (
    <section id="about" className="section bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)]">
      <div className="container mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-bold text-[var(--color-brand)] dark:text-[var(--color-accent)] mb-3 uppercase tracking-widest">
            Why TechNova?
          </p>
          <h2 className="font-black text-4xl lg:text-6xl text-[var(--color-text)] dark:text-[var(--color-dark-text)] max-w-3xl mx-auto leading-tight">
            Built different.{' '}
            <span className="text-brand-gradient">For Africa.</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] mt-5 max-w-lg mx-auto leading-relaxed">
            We don't just sell technology. We build ecosystems that work for the realities of African markets, infrastructure, and people.
          </p>
        </div>

        {/* Pillars grid */}
        <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="pillar-item group p-7 rounded-3xl
                bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]
                hover:bg-gradient-to-br hover:from-[var(--color-brand)] hover:to-[var(--color-accent)]
                transition-all duration-400 cursor-default"
            >
              <div className="text-[var(--color-brand)] dark:text-[var(--color-accent)] group-hover:text-white mb-5 transition-colors duration-300">
                {p.icon}
              </div>
              <h3 className="font-black text-xl text-[var(--color-text)] dark:text-[var(--color-dark-text)] group-hover:text-white mb-2 transition-colors duration-300">
                {p.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] group-hover:text-white/80 leading-relaxed transition-colors duration-300">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Countries strip */}
        <div className="overflow-hidden rounded-2xl bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] py-5 px-4">
          <p className="text-xs font-bold text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)] uppercase tracking-widest text-center mb-4">
            Available in 50+ African countries
          </p>
          <div className="overflow-hidden">
            <div ref={countriesRef} className="flex gap-3 whitespace-nowrap w-fit">
              {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold
                    bg-white dark:bg-[var(--color-dark-bg-card)]
                    text-[var(--color-text)] dark:text-[var(--color-dark-text)]
                    border border-[var(--color-border)] dark:border-[var(--color-dark-border)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] dark:bg-[var(--color-accent)]" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
