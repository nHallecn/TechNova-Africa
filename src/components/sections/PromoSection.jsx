import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TICKER_ITEMS = [
  'Up to 30% off ·', 'Free shipping nationwide ·', 'Trade-in your old device ·',
  '0% installment ·', 'Official warranty included ·', 'Same-day delivery ·',
  'Pay with MoMo ·', 'Pay with Orange Money ·',
]

const DEALS = [
  { title: 'Student Offer', desc: 'Verified students get 15% off all devices + free Nova Buds with any phone.', badge: '15% OFF', color: '#7c3aed', expiry: 'Ends 30 June' },
  { title: 'Bundle & Save', desc: 'Buy a Nova S25 + NovaTab and save XAF 120,000. Perfect for work and play.', badge: 'Save 120K', color: '#059669', expiry: 'Limited stock' },
  { title: 'Trade-In Deal', desc: 'Trade in any smartphone and get up to XAF 200,000 off your next Nova device.', badge: 'Up to 200K', color: '#ea580c', expiry: 'Ongoing' },
]

export default function PromoSection() {
  const tickerRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = tickerRef.current
    if (!el) return
    const w = el.scrollWidth / 2
    const tween = gsap.to(el, { x: -w, duration: 30, ease: 'none', repeat: -1 })
    return () => tween.kill()
  }, [])

  useGSAP(() => {
    gsap.fromTo('.promo-heading', { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: '.promo-heading', start: 'top 85%' }
    })
    gsap.fromTo('.deal-card', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.deals-row', start: 'top 80%' }
    })
    gsap.fromTo('.momo-banner', { opacity: 0, scale: 0.96 }, {
      opacity: 1, scale: 1, duration: 0.8,
      scrollTrigger: { trigger: '.momo-banner', start: 'top 85%' }
    })
  }, { scope: sectionRef })

  return (
    <section id="deals" ref={sectionRef}
      className="py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>

      {/* Ticker */}
      <div className="overflow-hidden mb-16 py-3"
        style={{ backgroundColor: 'var(--color-primary)', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div ref={tickerRef} className="flex whitespace-nowrap w-fit">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-semibold text-sm text-white px-3 inline-flex items-center gap-2">
              {item}
              <span className="inline-block w-1 h-1 rounded-full bg-white/40" />
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-5 2xl:px-0">
        {/* Heading */}
        <div className="promo-heading text-center mb-14 opacity-0">
          <p className="font-semibold text-sm uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-primary)' }}>Exclusive Offers</p>
          <h2 className="font-bold text-4xl lg:text-5xl" style={{ color: 'var(--text)' }}>Deals made for Africa.</h2>
          <p className="font-regular mt-4 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
            Localised pricing, mobile money payments, and offers tailored for your market.
          </p>
        </div>

        {/* Deal cards */}
        <div className="deals-row grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {DEALS.map(deal => (
            <div key={deal.title} className="deal-card group relative overflow-hidden rounded-3xl p-8 cursor-pointer
              transition-all duration-300 hover:-translate-y-1.5 opacity-0"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <span className="inline-block px-4 py-1.5 rounded-full text-white font-bold text-sm mb-5"
                style={{ backgroundColor: deal.color }}>{deal.badge}</span>
              <h3 className="font-bold text-2xl mb-3" style={{ color: 'var(--text)' }}>{deal.title}</h3>
              <p className="font-regular text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{deal.desc}</p>
              <div className="flex-between">
                <a href="#" className="font-bold text-sm transition-colors" style={{ color: deal.color }}>Shop now →</a>
                <span className="font-regular text-xs" style={{ color: 'var(--text-muted)' }}>{deal.expiry}</span>
              </div>
              {/* Glow blob */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-10
                group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: deal.color }} />
            </div>
          ))}
        </div>

        {/* Mobile money banner */}
        <div className="momo-banner relative overflow-hidden rounded-3xl p-10 lg:p-16 text-center opacity-0"
          style={{ background: 'linear-gradient(135deg, #0a1560 0%, #0071e3 50%, #00c8ff 100%)' }}>
          <div className="relative z-10">
            <p className="font-semibold text-sm uppercase tracking-widest mb-3 text-white/60">Mobile Money Ready</p>
            <h3 className="font-bold text-3xl lg:text-5xl text-white mb-4">
              Pay with MTN MoMo or Orange Money
            </h3>
            <p className="text-white/70 mb-8 max-w-md mx-auto font-regular">
              All purchases can be completed with your favourite mobile money wallet. No card needed.
            </p>
            <button className="px-8 py-3.5 rounded-full font-semibold text-base cursor-pointer transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
              style={{ backgroundColor: '#fff', color: 'var(--color-primary)' }}>
              Shop with Mobile Money
            </button>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
