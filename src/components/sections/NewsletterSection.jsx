import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { useFadeInUp } from '../../hooks/useGSAP'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const ref = useFadeInUp()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section className="section bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)]">
      <div className="container mx-auto">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl p-10 lg:p-20 text-center"
          style={{ background: 'linear-gradient(135deg, #0a1560 0%, #1428a0 40%, #0891b2 80%, #00c8ff 100%)' }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-white opacity-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white opacity-5 translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10">
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-4">Stay in the loop</p>
            <h2 className="font-black text-3xl lg:text-5xl text-white mb-4">
              Get deals before everyone else.
            </h2>
            <p className="text-white/70 mb-10 max-w-md mx-auto">
              Subscribe for exclusive offers, new launches, and tech tips designed for Africa.
            </p>

            {submitted ? (
              <div className="flex-center gap-3 text-white font-bold text-lg">
                <CheckCircle size={24} className="text-green-400" />
                You're subscribed! Check your inbox.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm font-medium outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="flex-center gap-2 px-7 py-3.5 rounded-full bg-white text-[var(--color-brand)] font-bold text-sm hover:bg-white/90 active:scale-95 transition-all duration-300 cursor-pointer flex-shrink-0"
                >
                  Subscribe <Send size={14} />
                </button>
              </form>
            )}

            {error && (
              <p className="text-red-300 text-sm mt-3">{error}</p>
            )}

            <p className="text-white/40 text-xs mt-5">
              No spam. Unsubscribe anytime. Read our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
