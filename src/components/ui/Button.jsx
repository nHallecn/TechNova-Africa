export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-full cursor-pointer transition-all duration-300 ease-out active:scale-95'

  const variants = {
    primary: 'bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-light)] shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    outline: 'border-2 border-[var(--color-brand)] text-[var(--color-brand)] dark:text-[var(--color-accent)] dark:border-[var(--color-accent)] hover:bg-[var(--color-brand)] hover:text-white dark:hover:bg-[var(--color-accent)] dark:hover:text-black',
    ghost: 'text-[var(--text)] hover:bg-[var(--surface)]',
    white: 'bg-white text-[var(--color-brand)] hover:bg-[var(--surface)] shadow-lg hover:-translate-y-0.5',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
    xl: 'px-10 py-4 text-lg',
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
