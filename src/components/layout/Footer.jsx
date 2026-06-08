import { Twitter, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'

const FOOTER_LINKS = {
  Products: ['Smartphones', 'Tablets', 'TVs & Displays', 'Audio', 'Wearables', 'Home Appliances'],
  Support: ['Contact Us', 'Find a Store', 'Service Centers', 'Warranty Info', 'Downloads', 'FAQ'],
  Company: ['About TechNova', 'Careers', 'Press & Media', 'Investors', 'Sustainability', 'Partners'],
  Legal: ['Privacy Policy', 'Cookie Policy', 'Terms of Use', 'Accessibility', 'Sitemap'],
}

const SOCIALS = [
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Youtube, label: 'YouTube' },
  { Icon: Linkedin, label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)] border-t border-[var(--color-border)] dark:border-[var(--color-dark-border)]">
      <div className="container mx-auto px-5 2xl:px-0 py-16">

        {/* Top: brand + social */}
        <div className="flex-between flex-wrap gap-8 mb-12 pb-12 border-b border-[var(--color-border)] dark:border-[var(--color-dark-border)]">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="var(--color-brand)" />
                <path d="M7 14C7 10.134 10.134 7 14 7V14H21C21 17.866 17.866 21 14 21C10.134 21 7 17.866 7 14Z" fill="white" />
                <circle cx="14" cy="14" r="3" fill="var(--color-brand)" />
              </svg>
              <span className="font-black text-xl text-[var(--color-text)] dark:text-[var(--color-dark-text)]">TechNova</span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] leading-relaxed">
              Bringing world-class technology to every corner of Africa. Innovation, accessibility, and reliability — for everyone.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-10 h-10 rounded-full flex-center
                  bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)]
                  text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]
                  hover:bg-[var(--color-brand)] hover:text-white
                  border border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                  transition-all duration-300 hover:scale-110"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-black text-sm text-[var(--color-text)] dark:text-[var(--color-dark-text)] mb-4 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]
                        hover:text-[var(--color-brand)] dark:hover:text-[var(--color-accent)]
                        transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--color-border)] dark:border-[var(--color-dark-border)] flex flex-col md:flex-row md:flex-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
            © {new Date().getFullYear()} TechNova Africa. All rights reserved.
            <span className="mx-2">·</span>
            TechNova is a fictional brand created for educational/practice purposes.
          </p>
          <div className="flex gap-5">
            {['Privacy', 'Cookies', 'Terms'].map(l => (
              <a
                key={l}
                href="#"
                className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)] hover:text-[var(--color-brand)] dark:hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
