import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme"
      style={{ color: 'var(--text-muted)' }}>
      <span style={{
        display: 'block',
        transition: 'all 0.3s ease',
        opacity: isDark ? 0 : 1,
        transform: isDark ? 'rotate(90deg) scale(0)' : 'rotate(0) scale(1)',
        position: isDark ? 'absolute' : 'static',
      }}>
        <Sun size={16} />
      </span>
      <span style={{
        display: 'block',
        transition: 'all 0.3s ease',
        opacity: isDark ? 1 : 0,
        transform: isDark ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0)',
        position: isDark ? 'static' : 'absolute',
      }}>
        <Moon size={16} />
      </span>
    </button>
  )
}
