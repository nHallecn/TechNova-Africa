import { useState } from 'react'
import { Menu, X, Search, ShoppingCart, ChevronDown } from 'lucide-react'
import { useScrollY } from '../../hooks/useScrollY'
import ThemeToggle from '../ui/ThemeToggle'

const NAV_LINKS = [
  {
    label: 'Phones',
    children: ['Nova S25', 'Nova S25+', 'Nova Fold', 'Nova A Series', 'View All'],
  },
  {
    label: 'Tablets',
    children: ['NovaTab Pro', 'NovaTab S', 'NovaTab A', 'View All'],
  },
  {
    label: 'TV & Audio',
    children: ['QLED TV', 'OLED TV', 'Soundbars', 'View All'],
  },
  {
    label: 'Home Appliances',
    children: ['Refrigerators', 'Washing Machines', 'Air Conditioners', 'View All'],
  },
  {
    label: 'Deals',
    children: [],
  },
]

export default function Navbar() {
  const scrollY = useScrollY()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const scrolled = scrollY > 20

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 
        ${scrolled ? 'nav-scrolled shadow-sm' : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto px-5 2xl:px-0">
        <nav className="flex-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <LogoMark />
            <span className="font-black text-xl tracking-tight text-[var(--color-text)] dark:text-[var(--color-dark-text)] group-hover:text-[var(--color-brand)] dark:group-hover:text-[var(--color-accent)] transition-colors duration-300">
              TechNova
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children.length && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium text-[var(--color-text)] dark:text-[var(--color-dark-text)] hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-dark-surface)] transition-all duration-200">
                  {link.label}
                  {link.children.length > 0 && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {/* Dropdown */}
                {link.children.length > 0 && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 min-w-44 rounded-2xl overflow-hidden shadow-xl border
                      bg-white dark:bg-[var(--color-dark-bg-card)]
                      border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                      transition-all duration-200 origin-top
                      ${activeDropdown === link.label ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
                    `}
                  >
                    {link.children.map((child) => (
                      <a
                        key={child}
                        href="#"
                        className={`block px-5 py-2.5 text-sm transition-colors duration-150
                          text-[var(--color-text)] dark:text-[var(--color-dark-text)]
                          hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-dark-surface)]
                          ${child === 'View All' ? 'font-bold text-[var(--color-brand)] dark:text-[var(--color-accent)] border-t border-[var(--color-border)] dark:border-[var(--color-dark-border)] mt-1' : ''}
                        `}
                      >
                        {child}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="hidden lg:flex w-9 h-9 rounded-full flex-center text-[var(--color-text)] dark:text-[var(--color-dark-text)] hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-dark-surface)] transition-all duration-200">
              <Search size={17} />
            </button>
            <button className="relative w-9 h-9 rounded-full flex-center text-[var(--color-text)] dark:text-[var(--color-dark-text)] hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-dark-surface)] transition-all duration-200">
              <ShoppingCart size={17} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold rounded-full flex-center bg-[var(--color-brand)] text-white">
                2
              </span>
            </button>
            <ThemeToggle />

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden w-9 h-9 rounded-full flex-center text-[var(--color-text)] dark:text-[var(--color-dark-text)] hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-dark-surface)] transition-all duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out
          bg-white dark:bg-[var(--color-dark-bg-card)]
          border-t border-[var(--color-border)] dark:border-[var(--color-dark-border)]
          ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-5 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className="block px-3 py-3 rounded-xl text-sm font-medium text-[var(--color-text)] dark:text-[var(--color-dark-text)] hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-dark-surface)] transition-colors duration-150"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 pb-1">
            <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] hover:bg-[var(--color-surface)] dark:hover:bg-[var(--color-dark-surface)] transition-colors duration-150">
              <Search size={16} />
              Search products...
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="var(--color-brand)" />
      <path d="M7 14C7 10.134 10.134 7 14 7V14H21C21 17.866 17.866 21 14 21C10.134 21 7 17.866 7 14Z" fill="white" />
      <circle cx="14" cy="14" r="3" fill="var(--color-brand)" />
    </svg>
  )
}
