import React, { useEffect, useRef, useState } from 'react'
import styles from '../WhatWeDoNav.module.css'

type NavItem = {
  href: string
  label: string
}

const defaultItems: NavItem[] = [
  { href: '#communication', label: 'Communication' },
  { href: '#collaboration', label: 'Collaboration' },
  { href: '#automation', label: 'Automation' },
  { href: '#business-apps', label: 'Business apps' },
  { href: '#governance', label: 'Governance' },
  { href: '#support', label: 'Support' },
]

export const WhatWeDoNav: React.FC<{ items?: NavItem[] }> = ({ items = defaultItems }) => {
  const navRef = useRef<HTMLElement | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const [stuck, setStuck] = useState(false)
  const [fixedStyle, setFixedStyle] = useState<React.CSSProperties | undefined>(undefined)

  useEffect(() => {
    const navEl = navRef.current
    const sentinel = sentinelRef.current
    if (!navEl || !sentinel) return

    const headerEl = document.querySelector('header') as HTMLElement | null
    const headerHeight = headerEl ? Math.round(headerEl.getBoundingClientRect().height) : 0

    const updateFixedStyle = () => {
      const rect = navEl.getBoundingClientRect()
      setFixedStyle({
        position: 'fixed',
        top: `${headerHeight}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        zIndex: 1000,
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        if (!e) return
        if (!e.isIntersecting) {
          updateFixedStyle()
          setStuck(true)
        } else {
          setStuck(false)
          setFixedStyle(undefined)
        }
      },
      { root: null, threshold: 0, rootMargin: `-${headerHeight}px 0px 0px 0px` }
    )

    observer.observe(sentinel)

    const onResize = () => {
      if (stuck) updateFixedStyle()
    }

    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [stuck])

  return (
    <>
      <div ref={sentinelRef} />
      {stuck && navRef.current && (
        <div style={{ height: navRef.current.getBoundingClientRect().height }} aria-hidden="true" />
      )}
      <nav
        ref={navRef}
        className={`${styles['what-we-do-nav']} ${stuck ? styles['what-we-do-nav--stuck'] : ''}`}
        style={stuck ? fixedStyle : undefined}
        aria-label="What we do navigation"
      >
        <ul className={styles['what-we-do-nav__list']}>
          {items.map((it) => (
            <li key={it.href} className={styles['what-we-do-nav__item']}> 
              <a className={styles['what-we-do-nav__link']} href={it.href}>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

// default export removed; use the named export `WhatWeDoNav`
