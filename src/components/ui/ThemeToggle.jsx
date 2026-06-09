import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-10 h-10 rounded-full flex-center cursor-pointer transition-all duration-300
        hover:scale-110 active:scale-95
        bg-[var(--surface)]
        text-[var(--color-brand)]
        border border-[var(--border)]"
    >
      {/* Sun — visible in light mode */}
      <span
        className="absolute transition-all duration-300"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)',
        }}
      >
        <Sun size={16} />
      </span>
      {/* Moon — visible in dark mode */}
      <span
        className="absolute transition-all duration-300"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
          color: 'var(--color-accent)',
        }}
      >
        <Moon size={16} />
      </span>
    </button>
  )
}
