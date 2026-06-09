import { Twitter, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'

const FOOTER_LINKS = {
  Products: ['Smartphones', 'Tablets', 'TVs & Displays', 'Audio', 'Wearables', 'Appliances'],
  Support: ['Contact Us', 'Find a Store', 'Service Centers', 'Warranty Info', 'Downloads', 'FAQ'],
  Company: ['About TechNova', 'Careers', 'Press & Media', 'Sustainability', 'Partners'],
  Legal: ['Privacy Policy', 'Cookie Policy', 'Terms of Use', 'Accessibility'],
}

const LEGAL_LINKS = [
  { label: 'Privacy Policy', link: '#' },
  { label: 'Terms of Use', link: '#' },
  { label: 'Cookie Policy', link: '#' },
  { label: 'Legal', link: '#' },
  { label: 'Site Map', link: '#' },
]

const SOCIALS = [
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Youtube, label: 'YouTube' },
  { Icon: Linkedin, label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer>
      {/* Top info bar */}
      <div className="info">
        <p>
          More ways to shop: Find a{' '}
          <span style={{ color: 'var(--color-primary)' }}>TechNova Store</span>
          {' '}or authorised retailer near you. Or call{' '}
          <span style={{ color: 'var(--color-primary)' }}>+237 000 000 000</span>.
        </p>
        <div className="flex gap-3 mt-4 lg:mt-0">
          {SOCIALS.map(({ Icon, label }) => (
            <a key={label} href="#" aria-label={label}
              className="w-8 h-8 rounded-full flex-center transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--color-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--surface)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>

      <hr />

      {/* Link columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {Object.entries(FOOTER_LINKS).map(([category, links]) => (
          <div key={category}>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text)' }}>
              {category}
            </h4>
            <ul className="space-y-2.5">
              {links.map(link => (
                <li key={link}>
                  <a href="#" className="font-regular text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr />

      {/* Bottom bar */}
      <div className="links">
        <p>
          Copyright © {new Date().getFullYear()} TechNova Africa.{' '}
          <span style={{ color: 'var(--text-muted)' }}>All rights reserved.</span>
        </p>
        <ul>
          {LEGAL_LINKS.map(({ label, link }) => (
            <li key={label}>
              <a href={link}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
