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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href) as HTMLElement | null
    if (!target) return

    // The page sections use a container div (e.g. "we-do-communication-container") as the content wrapper.
    const container = target.querySelector('div') as HTMLElement | null
    const headerEl = document.querySelector('header') as HTMLElement | null
    const headerHeight = headerEl ? Math.round(headerEl.getBoundingClientRect().height) : 0

    let navHeight = 0
    if (navRef.current && stuck) {
      navHeight = Math.round(navRef.current.getBoundingClientRect().height)
    }

    const scrollTarget = (container ?? target).getBoundingClientRect().top + window.scrollY - headerHeight - navHeight

    window.scrollTo({ top: scrollTarget, behavior: 'smooth' })

    try {
      history.replaceState(null, '', href)
    } catch (err) {
      // ignore
    }
    setActive(href)
  }

  const [active, setActive] = useState<string>(defaultItems[0].href)

  // Scroll spy: set the active section as the user scrolls
  useEffect(() => {
    const ids = items.map((it) => it.href)
    const sections = ids
      .map((id) => document.querySelector(id) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[]

    let ticking = false

    const updateActive = () => {
      const headerEl = document.querySelector('header') as HTMLElement | null
      const headerHeight = headerEl ? Math.round(headerEl.getBoundingClientRect().height) : 0
      const navHeight = navRef.current && stuck ? Math.round(navRef.current.getBoundingClientRect().height) : 0
      const offset = headerHeight + navHeight + 8

      let found = sections[0]
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.top <= offset && r.bottom > offset) {
          found = s
          break
        }
        // if none match, pick the first whose top > 0 (next one) as fallback
        if (!found && r.top > 0) {
          found = s
          break
        }
      }

      if (found) {
        setActive(`#${found.id}`)
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        updateActive()
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items, stuck])

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
        <ul className={styles['what-we-do-nav__list']} role="tablist" aria-label="What we do tabs">
          {items.map((it) => (
            <li key={it.href} className={styles['what-we-do-nav__item']}> 
              <a
                role="tab"
                aria-selected={active === it.href}
                className={`${styles['what-we-do-nav__link']} ${active === it.href ? styles['what-we-do-nav__link--active'] : ''}`}
                href={it.href}
                onClick={(e) => handleClick(e, it.href)}
              >
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
