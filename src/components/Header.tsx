import { Button } from '@fluentui/react-components';
import '../Header.css';
import { useState, useEffect } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header-root${scrolled ? ' header-root--scrolled' : ''}`}>
      <div className="header-container">
        <img src="https://365evergreen.com/wp-content/uploads/2025/07/cropped-Evergreen_Logo__2110.webp" alt="365 Evergreen Logo" className="header-logo" />
        <nav className={`header-nav${menuOpen ? ' header-nav--open' : ''}`}>
          <Button as="a" href="#" className="header-nav-btn" appearance="transparent">Home</Button>
          <Button as="a" href="#features" className="header-nav-btn" appearance="transparent">Features</Button>
          <Button as="a" href="#contact" className="header-nav-btn" appearance="transparent">Contact</Button>
        </nav>
        <button
          className="header-hamburger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="header-hamburger-bar" />
          <span className="header-hamburger-bar" />
          <span className="header-hamburger-bar" />
        </button>
      </div>
    </header>
  );
}
