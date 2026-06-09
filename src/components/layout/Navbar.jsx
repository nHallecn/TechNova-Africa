import { useState } from 'react'
import { Menu, X, Search, ShoppingCart } from 'lucide-react'
import { useScrollY } from '../../hooks/useScrollY'
import ThemeToggle from '../ui/ThemeToggle'

const NAV_LINKS = [
  { label: 'Store' },
  { label: 'Phones' },
  { label: 'Tablets' },
  { label: 'TV & Audio' },
  { label: 'Appliances' },
  { label: 'Deals' },
]

export default function Navbar() {
  const scrollY = useScrollY()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{ borderBottomColor: scrollY > 10 ? undefined : 'transparent' }}>
      <nav>
        {/* Logo */}
        <a href="#" className="nav-logo">
          <LogoMark />
          <span>TechNova</span>
        </a>

        {/* Desktop links */}
        <ul>
          {NAV_LINKS.map(({ label }) => (
            <li key={label}>
              <a href={`#${label.toLowerCase().replace(/ & /g, '-')}`}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="nav-actions">
          <button aria-label="Search"><Search size={16} /></button>
          <button aria-label="Cart" className="relative">
            <ShoppingCart size={16} />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 text-[9px] font-bold rounded-full flex-center"
              style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>2</span>
          </button>
          <ThemeToggle />
          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden px-5 py-3 border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}>
          {NAV_LINKS.map(({ label }) => (
            <a key={label} href={`#${label.toLowerCase()}`}
              className="block py-2.5 font-regular text-sm transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              onClick={() => setMenuOpen(false)}
            >{label}</a>
          ))}
        </div>
      )}
    </header>
  )
}

function LogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="7" fill="var(--color-primary)" />
      <path d="M7 14C7 10.134 10.134 7 14 7V14H21C21 17.866 17.866 21 14 21C10.134 21 7 17.866 7 14Z" fill="white" />
      <circle cx="14" cy="14" r="3" fill="var(--color-primary)" />
    </svg>
  )
}
