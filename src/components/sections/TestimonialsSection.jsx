import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useFadeInUp, useStaggerReveal } from '../../hooks/useGSAP'

const REVIEWS = [
  {
    id: 1,
    name: 'Aminata Diallo',
    role: 'Entrepreneur, Dakar',
    rating: 5,
    text: 'The Nova S25 Ultra changed how I run my business. The camera quality is unreal and the battery lasts my full working day without breaking a sweat.',
    avatar: 'AD',
    avatarColor: '#7c3aed',
    product: 'Nova S25 Ultra',
  },
  {
    id: 2,
    name: 'Kofi Mensah',
    role: 'Software Developer, Accra',
    rating: 5,
    text: 'Ordered on a Tuesday, arrived Wednesday morning. The NovaTab Pro is incredibly fast and the display is gorgeous for both coding and watching films.',
    avatar: 'KM',
    avatarColor: '#059669',
    product: 'NovaTab Pro 12',
  },
  {
    id: 3,
    name: 'Fatima El-Amin',
    role: 'Medical Doctor, Lagos',
    rating: 5,
    text: 'Paying with MTN MoMo was seamless. No issues, instant confirmation. The NovaCrystal TV arrived well packed and setup was a breeze.',
    avatar: 'FE',
    avatarColor: '#ea580c',
    product: 'NovaCrystal 65"',
  },
  {
    id: 4,
    name: 'Jean-Paul Nkosi',
    role: 'Journalist, Kinshasa',
    rating: 5,
    text: "The local French support team helped me set up everything in minutes. It's rare to get this level of service for tech purchases in DRC.",
    avatar: 'JN',
    avatarColor: '#0891b2',
    product: 'Nova S25+',
  },
  {
    id: 5,
    name: 'Chisom Okafor',
    role: 'Content Creator, Enugu',
    rating: 5,
    text: 'The camera does exactly what they promise. I shot an entire brand campaign with just the S25 Ultra. Clients thought I used professional equipment.',
    avatar: 'CO',
    avatarColor: '#dc2626',
    product: 'Nova S25 Ultra',
  },
  {
    id: 6,
    name: 'Aïssatou Touré',
    role: 'Teacher, Abidjan',
    rating: 5,
    text: 'Student discount saved me a lot and the free buds were a bonus. The phone is beautiful and the battery easily lasts two days with my usage.',
    avatar: 'AT',
    avatarColor: '#1428a0',
    product: 'Nova A55',
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const headingRef = useFadeInUp()
  const gridRef = useStaggerReveal('.review-card', { stagger: 0.07 })

  const prev = () => setActive(a => (a === 0 ? REVIEWS.length - 1 : a - 1))
  const next = () => setActive(a => (a === REVIEWS.length - 1 ? 0 : a + 1))

  return (
    <section
      id="reviews"
      className="section bg-[var(--color-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)] overflow-hidden"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div ref={headingRef} className="flex-between flex-wrap gap-6 mb-12">
          <div>
            <p className="text-sm font-bold text-[var(--color-brand)] dark:text-[var(--color-accent)] mb-2 uppercase tracking-widest">
              Customer Reviews
            </p>
            <h2 className="font-black text-4xl lg:text-5xl text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
              Real people.<br />Real stories.
            </h2>
          </div>
          {/* Nav buttons */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full flex-center border-2 border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                text-[var(--color-text)] dark:text-[var(--color-dark-text)]
                hover:bg-[var(--color-brand)] hover:text-white hover:border-[var(--color-brand)]
                transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full flex-center border-2 border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                text-[var(--color-text)] dark:text-[var(--color-dark-text)]
                hover:bg-[var(--color-brand)] hover:text-white hover:border-[var(--color-brand)]
                transition-all duration-300 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Reviews grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <div
              key={review.id}
              className={`review-card card p-7 transition-all duration-400
                ${i === active ? 'ring-2 ring-[var(--color-brand)] dark:ring-[var(--color-accent)] shadow-xl' : ''}
              `}
              onClick={() => setActive(i)}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, si) => (
                  <Star key={si} size={14} fill="var(--color-accent-warm)" color="var(--color-accent-warm)" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] leading-relaxed mb-6">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex-center text-white text-xs font-black flex-shrink-0"
                  style={{ backgroundColor: review.avatarColor }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
                    {review.name}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
                    {review.role}
                  </div>
                </div>
                <span
                  className="ml-auto text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: review.avatarColor + '20', color: review.avatarColor }}
                >
                  {review.product}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer
                ${i === active ? 'w-6 h-2 bg-[var(--color-brand)] dark:bg-[var(--color-accent)]' : 'w-2 h-2 bg-[var(--color-border)] dark:bg-[var(--color-dark-border)]'}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
