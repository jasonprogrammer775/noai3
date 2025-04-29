/**
 * Header.tsx
 * Site-wide header and navigation bar.
 * Receives title, subtitle, and navigation links as props.
 */
import { Link } from 'react-router-dom'

interface HeaderProps {
  title: string
  subtitle?: string
  links?: { to: string; label: string }[]
}

export const Header = ({ title, subtitle, links }: HeaderProps) => (
  <header className="mb-6 bg-blue-700 text-white shadow">
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between px-4 py-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-blue-100">{subtitle}</p>}
      </div>
      {links && (
        <nav className="mt-4 md:mt-0 flex flex-wrap gap-4" aria-label="Main navigation">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="relative inline-block px-5 py-2 rounded-lg overflow-hidden group transition-all duration-300 ease-out border border-white/20 focus-visible:outline focus-visible:outline-white shadow font-semibold"
              style={{ minWidth: 100, textAlign: 'center' }}
              tabIndex={0}
              aria-label={link.label}
            >
              {/* Animated background layers for hover effect */}
              <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="absolute inset-0 bg-white/5 translate-x-[-100%] delay-100 group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] delay-200 group-hover:translate-x-0 transition-transform duration-700 ease-out" />
              {/* Link text */}
              <span className="relative z-10 group-hover:text-blue-200 transition-colors duration-300">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  </header>
)