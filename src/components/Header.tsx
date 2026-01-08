import { Button } from '@fluentui/react-components';
import '../Header.css';
import { useState, useEffect } from 'react';
import { useGlobalNav } from '../lib/useGlobalNav';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems = useGlobalNav();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (url: string) => {
    // If url is absolute, open in new tab; else, use router
    if (/^https?:\/\//.test(url)) {
      window.open(url, '_blank');
    } else {
      navigate(url);
      setMenuOpen(false);
    }
  };

  return (
    <header className={`header-root${scrolled ? ' header-root--scrolled' : ''}`}>
      <div className="header-container">
        <img src="https://365evergreen.com/wp-content/uploads/2025/07/cropped-Evergreen_Logo__2110.webp" alt="365 Evergreen Logo" className="header-logo" />
        <nav className={`header-nav${menuOpen ? ' header-nav--open' : ''}`}>
          {navItems.length > 0 ? (
            navItems.map(item => (
              <Button as="a" href={item.url} className="header-nav-btn" appearance="transparent" key={item.url}
                onClick={e => { e.preventDefault(); handleNav(item.url.startsWith('/') ? item.url : `/${item.label.toLowerCase().replace(/\s+/g, '-')}`); }}>
                {item.label}
              </Button>
            ))
          ) : (
            <Button as="a" href="/" className="header-nav-btn" appearance="transparent">Home</Button>
          )}
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
