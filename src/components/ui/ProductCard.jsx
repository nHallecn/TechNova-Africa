import Button from './Button'
import { ArrowRight } from 'lucide-react'

export default function ProductCard({ product, className = '' }) {
  const { name, tagline, price, badge, image, accentColor = '#1428a0', dark: darkBg = false } = product

  return (
    <div
      className={`card relative overflow-hidden group cursor-pointer ${className}`}
      style={darkBg ? { backgroundColor: '#181818' } : {}}
    >
      {/* Badge */}
      {badge && (
        <span
          className="absolute top-5 left-5 text-xs font-bold px-3 py-1 rounded-full z-10"
          style={{ backgroundColor: accentColor, color: '#fff' }}
        >
          {badge}
        </span>
      )}

      {/* Image area */}
      <div className="relative h-56 lg:h-64 overflow-hidden flex-center bg-gradient-to-br from-transparent to-black/5 dark:to-white/5">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderDevice accentColor={accentColor} name={name} />
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-[var(--text)] leading-tight">
          {name}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mt-1 mb-4">
          {tagline}
        </p>
        <div className="flex-between">
          <span className="font-bold text-base text-[var(--text)]">
            {price}
          </span>
          <button
            className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group/btn"
            style={{ color: accentColor }}
          >
            Explore
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

// SVG placeholder when no image is provided
function PlaceholderDevice({ accentColor, name }) {
  const isPhone = name?.toLowerCase().includes('phone') || name?.toLowerCase().includes('galaxy') || name?.toLowerCase().includes('nova')
  const isTV = name?.toLowerCase().includes('tv') || name?.toLowerCase().includes('display')
  const isWatch = name?.toLowerCase().includes('watch')

  if (isPhone) {
    return (
      <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
        <rect x="10" y="5" width="100" height="170" rx="16" fill={accentColor} fillOpacity="0.12" stroke={accentColor} strokeWidth="2" />
        <rect x="18" y="22" width="84" height="130" rx="6" fill={accentColor} fillOpacity="0.08" />
        <circle cx="60" cy="167" r="6" fill={accentColor} fillOpacity="0.4" />
        <rect x="42" y="12" width="36" height="5" rx="2.5" fill={accentColor} fillOpacity="0.4" />
      </svg>
    )
  }
  if (isTV) {
    return (
      <svg width="200" height="130" viewBox="0 0 200 130" fill="none">
        <rect x="5" y="5" width="190" height="110" rx="8" fill={accentColor} fillOpacity="0.12" stroke={accentColor} strokeWidth="2" />
        <rect x="15" y="14" width="170" height="90" rx="4" fill={accentColor} fillOpacity="0.08" />
        <rect x="80" y="118" width="40" height="8" rx="4" fill={accentColor} fillOpacity="0.4" />
        <rect x="90" y="122" width="20" height="5" rx="2" fill={accentColor} fillOpacity="0.3" />
      </svg>
    )
  }
  if (isWatch) {
    return (
      <svg width="100" height="140" viewBox="0 0 100 140" fill="none">
        <rect x="36" y="5" width="28" height="20" rx="4" fill={accentColor} fillOpacity="0.3" />
        <rect x="36" y="115" width="28" height="20" rx="4" fill={accentColor} fillOpacity="0.3" />
        <rect x="18" y="28" width="64" height="84" rx="20" fill={accentColor} fillOpacity="0.12" stroke={accentColor} strokeWidth="2" />
        <circle cx="50" cy="70" r="24" fill={accentColor} fillOpacity="0.1" />
        <line x1="50" y1="56" x2="50" y2="70" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="70" x2="60" y2="76" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  // Generic device
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      <rect x="20" y="20" width="100" height="100" rx="20" fill={accentColor} fillOpacity="0.12" stroke={accentColor} strokeWidth="2" />
      <circle cx="70" cy="70" r="28" fill={accentColor} fillOpacity="0.15" />
      <circle cx="70" cy="70" r="14" fill={accentColor} fillOpacity="0.3" />
    </svg>
  )
}
