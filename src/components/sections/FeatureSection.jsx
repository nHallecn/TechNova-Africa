import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SPECS = [
  { icon: '📸', label: 'Camera', value: '200MP', detail: 'Pro-grade zoom system' },
  { icon: '⚡', label: 'Processor', value: 'Exynos X1', detail: '4nm flagship chip' },
  { icon: '🔋', label: 'Battery', value: '5000mAh', detail: '45W fast charging' },
  { icon: '📺', label: 'Display', value: '6.8" QHD+', detail: '2600nit peak' },
  { icon: '💾', label: 'Storage', value: 'Up to 1TB', detail: 'UFS 4.0 storage' },
  { icon: '🌐', label: '5G', value: 'WiFi 7', detail: 'Next-gen wireless' },
]

const COLORS = [
  { name: 'Midnight Blue', hex: '#1428a0' },
  { name: 'Phantom Black', hex: '#0a0a0a' },
  { name: 'Cream Gold', hex: '#c8a97e' },
  { name: 'Jade Green', hex: '#2d7a5a' },
]

export default function FeatureSection() {
  const [activeColor, setActiveColor] = useState(0)
  const sectionRef = useRef(null)
  const counterRef = useRef(null)
  const phoneRef = useRef(null)

  useGSAP(() => {
    // Heading reveal
    gsap.fromTo('.feature-heading', { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: '.feature-heading', start: 'top 85%' }
    })

    // Animated counter
    if (counterRef.current) {
      gsap.fromTo(counterRef.current, { innerText: 0 }, {
        innerText: 200, duration: 2, ease: 'power2.out', snap: { innerText: 1 },
        scrollTrigger: { trigger: counterRef.current, start: 'top 80%' }
      })
    }

    // Spec cards stagger
    gsap.fromTo('.spec-card', { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.08,
      scrollTrigger: { trigger: '.specs-grid', start: 'top 80%' }
    })

    // Phone float
    gsap.to('.phone-float', {
      y: -14, duration: 2.5, ease: 'power1.inOut', yoyo: true, repeat: -1
    })
  }, { scope: sectionRef })

  const handleColorChange = (i) => {
    setActiveColor(i)
    if (phoneRef.current) {
      gsap.to(phoneRef.current, { scale: 0.93, duration: 0.12, ease: 'power2.in',
        onComplete: () => gsap.to(phoneRef.current, { scale: 1, duration: 0.2, ease: 'back.out(1.4)' })
      })
    }
  }

  const color = COLORS[activeColor].hex

  return (
    <section id="flagship" ref={sectionRef}
      className="py-20 lg:py-32" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container mx-auto px-5 2xl:px-0">

        {/* Heading */}
        <div className="feature-heading text-center mb-16 opacity-0">
          <p className="font-semibold text-sm uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-primary)' }}>Flagship Series</p>
          <h2 className="font-bold text-4xl lg:text-6xl max-w-3xl mx-auto" style={{ color: 'var(--text)' }}>
            Nova S25 Ultra.{' '}
            <span className="text-brand-gradient">Redefine everything.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Phone */}
          <div className="flex flex-col items-center gap-8">
            <div className="phone-float relative w-56 lg:w-72" ref={phoneRef}>
              <PhoneSVG color={color} />
              <div className="absolute inset-0 -z-10 blur-3xl opacity-25 scale-75 rounded-full"
                style={{ backgroundColor: color }} />
            </div>

            {/* Color picker */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-3">
                {COLORS.map((c, i) => (
                  <button key={c.name} onClick={() => handleColorChange(i)} title={c.name}
                    className="w-7 h-7 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: c.hex,
                      transform: activeColor === i ? 'scale(1.3)' : undefined,
                      boxShadow: activeColor === i ? `0 0 0 2px var(--bg), 0 0 0 4px ${c.hex}` : 'none',
                    }} />
                ))}
              </div>
              <p className="font-regular text-sm" style={{ color: 'var(--text-muted)' }}>
                {COLORS[activeColor].name}
              </p>
            </div>
          </div>

          {/* Specs */}
          <div>
            {/* Counter block */}
            <div className="rounded-3xl p-8 mb-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="flex items-end gap-1">
                <span ref={counterRef} className="font-black text-7xl lg:text-8xl leading-none text-brand-gradient">0</span>
                <span className="font-black text-4xl mb-2" style={{ color: 'var(--color-primary)' }}>MP</span>
              </div>
              <p className="font-regular text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                The most advanced camera system ever put in a phone. Capture moments with cinema-quality precision.
              </p>
            </div>

            {/* Spec grid */}
            <div className="specs-grid grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SPECS.map(spec => (
                <div key={spec.label} className="spec-card group p-4 rounded-2xl cursor-default transition-all duration-300 opacity-0"
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.borderColor = 'var(--color-primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--surface)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
                  <span className="text-xl mb-2 block">{spec.icon}</span>
                  <div className="font-bold text-base" style={{ color: 'var(--text)' }}>{spec.value}</div>
                  <div className="font-regular text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{spec.detail}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mt-6">
              <button className="flex-1 py-3 rounded-full font-semibold text-sm text-white cursor-pointer transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)' }}>
                Order Now — XAF 750,000
              </button>
              <button className="py-3 px-6 rounded-full font-semibold text-sm cursor-pointer transition-all duration-300"
                style={{ border: '1.5px solid var(--border)', color: 'var(--text-muted)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
                Compare
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneSVG({ color }) {
  return (
    <svg viewBox="0 0 280 580" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-2xl">
      <rect x="4" y="4" width="272" height="572" rx="40" fill={color} />
      <rect x="4" y="4" width="272" height="572" rx="40" fill="url(#shine)" />
      <rect x="14" y="14" width="252" height="552" rx="32" fill="#050505" />
      <rect x="14" y="14" width="252" height="552" rx="32" fill={color} fillOpacity="0.07" />
      <circle cx="140" cy="50" r="8" fill="#111" />
      <circle cx="140" cy="50" r="5" fill="#0a0a0a" />
      <rect x="30" y="80" width="220" height="120" rx="12" fill={color} fillOpacity="0.14" />
      <rect x="46" y="100" width="80" height="8" rx="4" fill="white" fillOpacity="0.6" />
      <rect x="46" y="116" width="140" height="5" rx="2.5" fill="white" fillOpacity="0.3" />
      <rect x="46" y="129" width="100" height="5" rx="2.5" fill="white" fillOpacity="0.2" />
      <circle cx="214" cy="112" r="20" fill={color} fillOpacity="0.35" />
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <rect key={i} x={30+(i%3)*80+12} y={222+Math.floor(i/3)*80+12} width="52" height="52" rx="14"
          fill={color} fillOpacity={0.18 - i*0.01} />
      ))}
      <rect x="100" y="542" width="80" height="4" rx="2" fill="white" fillOpacity="0.25" />
      <rect x="271" y="160" width="9" height="50" rx="4" fill={color} />
      <rect x="271" y="230" width="9" height="80" rx="4" fill={color} />
      <rect x="0" y="200" width="9" height="60" rx="4" fill={color} />
      <defs>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.22" />
          <stop offset="50%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.12" />
        </linearGradient>
      </defs>
    </svg>
  )
}
