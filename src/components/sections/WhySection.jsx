import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  { icon: '✓', title: '2-Year Warranty', desc: 'Every device ships with a full manufacturer warranty and in-country service support.' },
  { icon: '⚡', title: 'Same-Day Delivery', desc: 'Order before noon in Yaoundé, Douala, Abidjan, Lagos and more for same-day delivery.' },
  { icon: '🔒', title: 'Secure Payments', desc: 'MTN MoMo, Orange Money, Visa, Mastercard — all payments are encrypted and secure.' },
  { icon: '💬', title: 'Local Support', desc: 'French and English customer support available 7 days a week via call, chat, and WhatsApp.' },
  { icon: '↩', title: 'Trade-In Program', desc: 'Trade in any working device and get up to XAF 200,000 off your upgrade instantly.' },
  { icon: '🌱', title: 'Energy Efficient', desc: 'All appliances are A+ rated. Built for African voltage and climate conditions.' },
]

const COUNTRIES = ['Cameroon','Nigeria',"Côte d'Ivoire",'Senegal','Ghana','Kenya','Ethiopia','Tanzania','Uganda','Rwanda','DR Congo','South Africa','Egypt','Morocco','Tunisia']

export default function WhySection() {
  const tickerRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = tickerRef.current
    if (!el) return
    const w = el.scrollWidth / 2
    const tween = gsap.to(el, { x: -w, duration: 22, ease: 'none', repeat: -1 })
    return () => tween.kill()
  }, [])

  useGSAP(() => {
    gsap.fromTo('.why-heading', { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: '.why-heading', start: 'top 85%' }
    })
    gsap.fromTo('.pillar-item', { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.08,
      scrollTrigger: { trigger: '.pillars-grid', start: 'top 80%' }
    })
  }, { scope: sectionRef })

  return (
    <section id="about" ref={sectionRef}
      className="py-20 lg:py-32" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container mx-auto px-5 2xl:px-0">

        <div className="why-heading text-center mb-16 opacity-0">
          <p className="font-semibold text-sm uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-primary)' }}>Why TechNova?</p>
          <h2 className="font-bold text-4xl lg:text-6xl max-w-3xl mx-auto" style={{ color: 'var(--text)' }}>
            Built different.{' '}
            <span className="text-brand-gradient">For Africa.</span>
          </h2>
          <p className="font-regular mt-5 max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
            We don't just sell technology. We build ecosystems that work for the realities of African markets, infrastructure, and people.
          </p>
        </div>

        {/* Pillars */}
        <div className="pillars-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {PILLARS.map(p => (
            <div key={p.title} className="pillar-item group p-7 rounded-3xl cursor-default opacity-0
              transition-all duration-400"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #0071e3 0%, #00c8ff 100%)'
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.querySelectorAll('[data-text]').forEach(el => el.style.color = '#fff')
                e.currentTarget.querySelectorAll('[data-muted]').forEach(el => el.style.color = 'rgba(255,255,255,0.75)')
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg-card)'
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.querySelectorAll('[data-text]').forEach(el => el.style.color = 'var(--text)')
                e.currentTarget.querySelectorAll('[data-muted]').forEach(el => el.style.color = 'var(--text-muted)')
              }}>
              <span className="text-2xl mb-4 block">{p.icon}</span>
              <h3 className="font-bold text-lg mb-2 transition-colors duration-300" data-text
                style={{ color: 'var(--text)' }}>{p.title}</h3>
              <p className="font-regular text-sm leading-relaxed transition-colors duration-300" data-muted
                style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Countries ticker */}
        <div className="rounded-2xl overflow-hidden py-5 px-4" style={{ backgroundColor: 'var(--surface)' }}>
          <p className="font-semibold text-xs uppercase tracking-widest text-center mb-4"
            style={{ color: 'var(--text-muted)' }}>Available in 50+ African countries</p>
          <div className="overflow-hidden">
            <div ref={tickerRef} className="flex gap-3 whitespace-nowrap w-fit">
              {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold text-sm"
                  style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text)', border: '1px solid var(--border)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
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
