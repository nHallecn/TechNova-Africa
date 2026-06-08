import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFadeInUp, useStaggerReveal } from '../../hooks/useGSAP'

gsap.registerPlugin(ScrollTrigger)

const SPECS = [
  { icon: '📸', label: 'Camera', value: '200MP', detail: 'Pro-grade zoom system' },
  { icon: '⚡', label: 'Processor', value: 'Exynos X1', detail: '4nm flagship chip' },
  { icon: '🔋', label: 'Battery', value: '5000mAh', detail: '45W fast charging' },
  { icon: '📺', label: 'Display', value: '6.8" QHD+', detail: '2600nit peak brightness' },
  { icon: '💾', label: 'Storage', value: 'Up to 1TB', detail: 'UFS 4.0 storage' },
  { icon: '🌐', label: 'Connectivity', value: '5G + WiFi 7', detail: 'Next-gen wireless' },
]

const COLORS = [
  { name: 'Midnight Blue', hex: '#1428a0' },
  { name: 'Phantom Black', hex: '#0a0a0a' },
  { name: 'Cream Gold', hex: '#d4b896' },
  { name: 'Jade Green', hex: '#2d7a5a' },
]

export default function FeatureSection() {
  const [activeColor, setActiveColor] = useState(0)
  const phoneRef = useRef(null)
  const headingRef = useFadeInUp()
  const specsRef = useStaggerReveal('.spec-item', { stagger: 0.07 })

  // Number counter animation
  const counterRef = useRef(null)
  useEffect(() => {
    if (!counterRef.current) return
    gsap.fromTo(
      counterRef.current,
      { innerText: 0 },
      {
        innerText: 200,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 85%',
        },
      }
    )
  }, [])

  // Color change morphs phone color
  const handleColorChange = (idx) => {
    setActiveColor(idx)
    if (phoneRef.current) {
      gsap.to(phoneRef.current, { scale: 0.92, duration: 0.15, ease: 'power2.in', yoyo: true, repeat: 1 })
    }
  }

  const color = COLORS[activeColor].hex

  return (
    <section id="flagship" className="section bg-[var(--color-bg)] dark:bg-[var(--color-dark-bg)] overflow-hidden">
      <div className="container mx-auto">

        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-bold text-[var(--color-brand)] dark:text-[var(--color-accent)] mb-3 uppercase tracking-widest">
            Flagship Series
          </p>
          <h2 className="font-black text-4xl lg:text-6xl text-[var(--color-text)] dark:text-[var(--color-dark-text)] max-w-3xl mx-auto leading-tight">
            Nova S25 Ultra.{' '}
            <span className="text-brand-gradient">
              Redefine everything.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Phone visual */}
          <div className="flex flex-col items-center gap-10">
            <div ref={phoneRef} className="relative w-64 lg:w-80 transition-all duration-500">
              <PhoneSVG color={color} />
              {/* Glow behind phone */}
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-30 scale-75 rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>

            {/* Color picker */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-3">
                {COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => handleColorChange(i)}
                    title={c.name}
                    className={`w-8 h-8 rounded-full transition-all duration-300 cursor-pointer
                      ${activeColor === i ? 'scale-125 ring-2 ring-offset-2 ring-[var(--color-text)] dark:ring-[var(--color-dark-text)]' : 'hover:scale-110'}
                    `}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] font-medium">
                {COLORS[activeColor].name}
              </p>
            </div>
          </div>

          {/* Specs */}
          <div>
            {/* Big counter */}
            <div className="mb-10 p-8 rounded-3xl bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]">
              <div className="flex items-end gap-1">
                <span
                  ref={counterRef}
                  className="font-black text-7xl lg:text-8xl text-brand-gradient leading-none"
                >
                  0
                </span>
                <span className="font-black text-4xl text-[var(--color-brand)] dark:text-[var(--color-accent)] mb-2">MP</span>
              </div>
              <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] mt-2 text-sm">
                The most advanced camera system ever put in a phone. Capture moments with cinema-quality precision.
              </p>
            </div>

            {/* Spec grid */}
            <div ref={specsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="spec-item group p-4 rounded-2xl cursor-default
                    bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]
                    hover:bg-[var(--color-brand)] dark:hover:bg-[var(--color-brand)]
                    transition-all duration-300"
                >
                  <span className="text-2xl mb-2 block">{spec.icon}</span>
                  <div className="font-black text-lg text-[var(--color-text)] dark:text-[var(--color-dark-text)] group-hover:text-white transition-colors duration-300">
                    {spec.value}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)] group-hover:text-white/70 mt-0.5 transition-colors duration-300">
                    {spec.detail}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <button className="flex-1 py-3 rounded-full bg-[var(--color-brand)] text-white font-bold text-sm hover:bg-[var(--color-brand-light)] transition-colors duration-300 cursor-pointer">
                Order Now — XAF 750,000
              </button>
              <button className="py-3 px-6 rounded-full border-2 border-[var(--color-border)] dark:border-[var(--color-dark-border)] text-[var(--color-text)] dark:text-[var(--color-dark-text)] font-bold text-sm hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] dark:hover:text-[var(--color-accent)] transition-all duration-300 cursor-pointer">
                Compare
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Custom inline phone SVG — fully original, no brand assets
function PhoneSVG({ color }) {
  return (
    <svg viewBox="0 0 280 580" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-2xl">
      {/* Body */}
      <rect x="4" y="4" width="272" height="572" rx="40" fill={color} />
      <rect x="4" y="4" width="272" height="572" rx="40" fill="url(#shine)" />
      {/* Screen */}
      <rect x="14" y="14" width="252" height="552" rx="32" fill="#050505" />
      {/* Screen content glow */}
      <rect x="14" y="14" width="252" height="552" rx="32" fill={color} fillOpacity="0.08" />
      {/* Punch-hole camera */}
      <circle cx="140" cy="50" r="8" fill="#111" />
      <circle cx="140" cy="50" r="5" fill="#0a0a0a" />
      {/* Screen UI mockup */}
      <rect x="30" y="80" width="220" height="120" rx="12" fill={color} fillOpacity="0.15" />
      <rect x="30" y="80" width="220" height="120" rx="12" fill="url(#screengrad)" fillOpacity="0.3" />
      <rect x="46" y="100" width="80" height="8" rx="4" fill="white" fillOpacity="0.7" />
      <rect x="46" y="116" width="140" height="6" rx="3" fill="white" fillOpacity="0.4" />
      <rect x="46" y="130" width="100" height="6" rx="3" fill="white" fillOpacity="0.3" />
      <circle cx="214" cy="112" r="20" fill={color} fillOpacity="0.4" />
      {/* App grid */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <rect
          key={i}
          x={30 + (i % 3) * 80 + 12}
          y={220 + Math.floor(i / 3) * 80 + 12}
          width="52"
          height="52"
          rx="14"
          fill={color}
          fillOpacity={0.2 - i * 0.01}
        />
      ))}
      {/* Bottom bar */}
      <rect x="100" y="540" width="80" height="4" rx="2" fill="white" fillOpacity="0.3" />
      {/* Side buttons */}
      <rect x="271" y="160" width="9" height="50" rx="4" fill={color} />
      <rect x="271" y="230" width="9" height="80" rx="4" fill={color} />
      <rect x="0" y="200" width="9" height="60" rx="4" fill={color} />
      {/* Gradient defs */}
      <defs>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.25" />
          <stop offset="50%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="screengrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
