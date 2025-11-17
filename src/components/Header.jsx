import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const handleLogoClick = () => {
    setIsMenuOpen(false)
    // Scroll to top when logo is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="header">
      <Link to="/" className="logo-floating" onClick={handleLogoClick}>
        <img src="/imgs/macroLogoLong.png" alt="MacroMarketing" className="logo-img" />
      </Link>

      <div className="main-header">
        <div className="container">
          <div className="header-content">
            <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
              <Link
                to="/"
                className={location.pathname === '/' ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={location.pathname === '/about' ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={location.pathname === '/contact' ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>

            <button
              className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="menu-arrow" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

