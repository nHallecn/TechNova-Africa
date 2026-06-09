import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REVIEWS = [
  { id:1, name:'Aminata Diallo', role:'Entrepreneur, Dakar', rating:5, text:"The Nova S25 Ultra changed how I run my business. The camera quality is unreal and the battery lasts my full working day.", avatar:'AD', color:'#7c3aed', product:'Nova S25 Ultra' },
  { id:2, name:'Kofi Mensah', role:'Developer, Accra', rating:5, text:"Ordered on Tuesday, arrived Wednesday morning. The NovaTab Pro is incredibly fast and the display is gorgeous for coding and films.", avatar:'KM', color:'#059669', product:'NovaTab Pro 12' },
  { id:3, name:'Fatima El-Amin', role:'Medical Doctor, Lagos', rating:5, text:"Paying with MTN MoMo was seamless. No issues, instant confirmation. The NovaCrystal TV arrived well packed and setup was a breeze.", avatar:'FE', color:'#ea580c', product:'NovaCrystal 65"' },
  { id:4, name:'Jean-Paul Nkosi', role:'Journalist, Kinshasa', rating:5, text:"The local French support team helped me set up everything in minutes. It is rare to get this level of service for tech purchases in DRC.", avatar:'JN', color:'#0891b2', product:'Nova S25+' },
  { id:5, name:'Chisom Okafor', role:'Content Creator, Enugu', rating:5, text:"The camera does exactly what they promise. I shot an entire brand campaign with just the S25 Ultra. Clients thought I used professional equipment.", avatar:'CO', color:'#dc2626', product:'Nova S25 Ultra' },
  { id:6, name:'Aissatou Toure', role:'Teacher, Abidjan', rating:5, text:"Student discount saved me a lot and the free buds were a bonus. The phone is beautiful and the battery easily lasts two days with my usage.", avatar:'AT', color:'#0071e3', product:'Nova A55' },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  useGSAP(() => {
    gsap.fromTo('.reviews-heading', { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: '.reviews-heading', start: 'top 85%' }
    })
    gsap.fromTo('.review-card', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.08,
      scrollTrigger: { trigger: '.reviews-grid', start: 'top 80%' }
    })
  })

  return (
    <section id="reviews" className="py-20 lg:py-32" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-5 2xl:px-0">

        <div className="reviews-heading flex-between flex-wrap gap-6 mb-12 opacity-0">
          <div>
            <p className="font-semibold text-sm uppercase tracking-widest mb-2"
              style={{ color: 'var(--color-primary)' }}>Customer Reviews</p>
            <h2 className="font-bold text-4xl lg:text-5xl" style={{ color: 'var(--text)' }}>
              Real people.<br />Real stories.
            </h2>
          </div>
          <div className="flex gap-3">
            {[ChevronLeft, ChevronRight].map((Icon, i) => (
              <button key={i} onClick={() => setActive(a => i === 0 ? (a === 0 ? REVIEWS.length-1 : a-1) : (a === REVIEWS.length-1 ? 0 : a+1))}
                className="w-11 h-11 rounded-full flex-center cursor-pointer transition-all duration-300"
                style={{ border: '1.5px solid var(--border)', color: 'var(--text-muted)' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
                <Icon size={17} />
              </button>
            ))}
          </div>
        </div>

        <div className="reviews-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <div key={r.id} className="review-card rounded-3xl p-7 cursor-pointer transition-all duration-400 opacity-0"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: i === active ? `2px solid var(--color-primary)` : '1px solid var(--border)',
                boxShadow: i === active ? '0 8px 32px rgba(0,113,227,0.15)' : 'none',
              }}
              onClick={() => setActive(i)}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, si) => (
                  <Star key={si} size={13} fill="#ff9004" color="#ff9004" />
                ))}
              </div>
              <p className="font-regular text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                "{r.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: r.color }}>{r.avatar}</div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{r.name}</div>
                  <div className="font-regular text-xs" style={{ color: 'var(--text-muted)' }}>{r.role}</div>
                </div>
                <span className="ml-auto font-semibold text-xs px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: r.color + '1a', color: r.color }}>{r.product}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === active ? '24px' : '8px',
                height: '8px',
                backgroundColor: i === active ? 'var(--color-primary)' : 'var(--border)',
              }} />
          ))}
        </div>
      </div>
    </section>
  )
}
