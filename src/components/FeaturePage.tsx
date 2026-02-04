import React from 'react'
import styles from '../FeaturePage.module.css'

type FeaturePageProps = {
  title?: string
  subtitle?: string
  children?: React.ReactNode
  hideHero?: boolean
}

const FeaturePage: React.FC<FeaturePageProps> = ({ title = 'Feature', subtitle, children, hideHero = false }) => {
  return (
    <section className={styles['featurepage-root']} aria-labelledby="featurepage-title">
      {!hideHero && (
        <div className={styles['featurepage-hero']}>
          <div className={styles['featurepage-heroBg']} aria-hidden="true" />
          <div className={styles['featurepage-heroOverlay']} aria-hidden="true" />
          <div className={styles['featurepage-heroInner']}>
            <h2 id="featurepage-title" className={styles['featurepage-title']}>{title}</h2>
            {subtitle && <p className={styles['featurepage-subtitle']}>{subtitle}</p>}
            <div className={styles['featurepage-heroCta']}>
              <a className={styles['featurepage-heroBtn']} href="#contact">Get in touch</a>
            </div>
          </div>
        </div>
      )}

      <div className={styles['featurepage-content']}>
        <aside className={styles['featurepage-aside']}> 
          <nav className={styles['featurepage-asideNav']} aria-label="Feature quick links">
            <ul>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#benefits">Benefits</a></li>
              <li><a href="#details">Details</a></li>
            </ul>
          </nav>
        </aside>

        <div className={styles['featurepage-main']}>
          {children ?? (
            <>
              <h3 id="overview">Overview</h3>
              <p>This is a placeholder feature page. Replace with content.</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturePage
