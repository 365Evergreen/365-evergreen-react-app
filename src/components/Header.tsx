import { Button } from '@fluentui/react-components';
import { ChevronDown24Regular } from '@fluentui/react-icons';
import '../Header.css';
import { useState, useEffect } from 'react';
import { useGlobalNav } from '../lib/useGlobalNav';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
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

  const handleSubmenuToggle = (id: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <header className={`header-root${scrolled ? ' header-root--scrolled' : ''}`}>
      <div className="header-container" style={{ display: 'flex', alignItems: 'center' }}>
        <a href="/" className="header-logo-link">
          <img src="https://365evergreen.com/wp-content/uploads/2025/07/cropped-Evergreen_Logo__2110.webp" alt="365 Evergreen Logo" className="header-logo" />
          <h1 className={`header-title${scrolled ? ' header-title--scrolled' : ''}`}>365 Evergreen</h1>
        </a>
        <nav className={`header-nav${menuOpen ? ' header-nav--open' : ''}`}>
          {navItems.length > 0 ? (
            navItems.map((item, idx) => {
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = !!openSubmenus[item.id || idx];
              const navKey = item.id && item.id !== '' ? item.id : `nav-${idx}`;
              return (
                <div className="header-nav-item" key={navKey} style={{ position: 'relative', display: 'inline-block' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button as="a" href={item.url} className="header-nav-btn" appearance="transparent"
                      onClick={e => { e.preventDefault(); handleNav(item.uri); }}>
                      {item.label}
                    </Button>
                    {hasChildren && (
                      <button
                        type="button"
                        aria-label={isOpen ? `Collapse submenu for ${item.label}` : `Expand submenu for ${item.label}`}
                        onClick={() => handleSubmenuToggle(item.id)}
                        className="header-chevron-btn"
                      >
                        <ChevronDown24Regular className="header-chevron-icon" style={{ marginLeft: 4, marginRight: 4, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
                      </button>
                    )}
                  </div>
                  {hasChildren && isOpen && (
                    <div className="header-nav-submenu" style={{ position: 'absolute', left: 0, top: '100%', background: '#fff', minWidth: 180, zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                      {item.children?.map((sub, subIdx) => {
                        const subKey = sub.id && sub.id !== '' ? sub.id : `subnav-${idx}-${subIdx}`;
                        return (
                          <Button as="a" href={sub.url} className="header-nav-btn header-nav-btn--submenu" appearance="transparent" key={subKey}
                            onClick={e => { e.preventDefault(); handleNav(sub.uri); }}>
                            {sub.label}
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <Button as="a" href="/" className="header-nav-btn" appearance="transparent">Home</Button>
          )}
          <Button as="a" href="#contact" className="header-contact-btn">Get in touch</Button>
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
