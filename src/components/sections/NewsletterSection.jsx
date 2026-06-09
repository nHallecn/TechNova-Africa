import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useGSAP(() => {
    gsap.fromTo('.newsletter-box', { opacity: 0, scale: 0.96 }, {
      opacity: 1, scale: 1, duration: 0.8,
      scrollTrigger: { trigger: '.newsletter-box', start: 'top 85%' }
    })
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return }
    setError('')
    setSubmitted(true)
  }

  return (
    <section className="py-20 lg:py-32" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container mx-auto px-5 2xl:px-0">
        <div className="newsletter-box relative overflow-hidden rounded-3xl p-10 lg:p-20 text-center opacity-0"
          style={{ background: 'linear-gradient(135deg, #0a1560 0%, #0071e3 45%, #00c8ff 100%)' }}>

          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10">
            <p className="font-semibold text-sm uppercase tracking-widest mb-4 text-white/60">Stay in the loop</p>
            <h2 className="font-bold text-3xl lg:text-5xl text-white mb-4">Get deals before everyone else.</h2>
            <p className="text-white/70 mb-10 max-w-md mx-auto font-regular">
              Subscribe for exclusive offers, new launches, and tech tips designed for Africa.
            </p>

            {submitted ? (
              <div className="flex-center gap-3 text-white font-semibold text-lg">
                <CheckCircle size={22} className="text-green-400" />
                You're subscribed! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 rounded-full font-regular text-sm outline-none transition-all duration-300"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                  onFocus={e => { e.target.style.backgroundColor = 'rgba(255,255,255,0.18)'; e.target.style.borderColor = 'rgba(255,255,255,0.4)' }}
                  onBlur={e => { e.target.style.backgroundColor = 'rgba(255,255,255,0.12)'; e.target.style.borderColor = 'rgba(255,255,255,0.2)' }} />
                <button type="submit"
                  className="flex-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer
                    transition-all duration-300 hover:opacity-90 active:scale-95 flex-shrink-0"
                  style={{ backgroundColor: '#fff', color: 'var(--color-primary)' }}>
                  Subscribe <Send size={13} />
                </button>
              </form>
            )}

            {error && <p className="text-red-300 font-regular text-sm mt-3">{error}</p>}
            <p className="text-white/40 font-regular text-xs mt-5">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
