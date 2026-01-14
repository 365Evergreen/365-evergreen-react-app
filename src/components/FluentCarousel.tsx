import carouselStyles from '../Carousel.module.css';
import carouselItems from '../../carousel-items.json';
import * as React from "react";

import {
  Button,
  Carousel,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselSlider,
  CarouselViewport,
  makeStyles,
  tokens,
  typographyStyles,
} from "@fluentui/react-components";
import type { CarouselAnnouncerFunction } from "@fluentui/react-components";

const useClasses = makeStyles({
  bannerCard: {
    alignContent: "center",
    height: "450px",
    textAlign: "left",
    position: "relative",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    position: "absolute",
    left: "7vw",
    top: "18%",
    background: tokens.colorNeutralBackground1,
    padding: "38px 44px 38px 44px",
    maxWidth: "440px",
    width: "48%",
    minHeight: "260px",
    boxShadow: tokens.shadow28,
    borderRadius: tokens.borderRadiusLarge,
  },
  title: {
    ...typographyStyles.title1,
  },
  subtext: {
    ...typographyStyles.body1,
  },
});


// Normalize and filter carousel items
const SLIDES = (Array.isArray(carouselItems) ? carouselItems : []).filter(item => item.dsplay === true).map(item => ({
  title: item.Title,
  // coerce null to undefined to match BannerCardProps (string | undefined)
  blurb: item.Blurb ?? undefined,
  image: (item.image || '').replace(/^[\s"]+|[\s",]+$/g, ''),
  cta: item.CTA ?? undefined,
}));



interface BannerCardProps {
  image: string;
  title: string;
  blurb?: string;
  cta?: string;
}

const BannerCard: React.FC<BannerCardProps> = ({ image, title, blurb, cta }) => {
  const classes = useClasses();
  return (
    <CarouselCard className={classes.bannerCard}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: tokens.borderRadiusMedium,
        zIndex: 0,
      }} aria-hidden="true" />
      <div className={classes.cardContainer}>
        <div className={classes.title}>{title}</div>
        {blurb && <div className={classes.subtext}>{blurb}</div>}
        {cta && (
          <a
            href="#"
            className="features-link"
            style={{ textDecoration: 'none', marginTop: '1em', display: 'inline-block' }}
            tabIndex={0}
            onClick={e => {
              e.preventDefault();
              // Add navigation or action here if needed
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4em', fontSize: '1rem' }}>
              {cta}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '0.1em' }}>
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        )}
      </div>
    </CarouselCard>
  );
};

const getAnnouncement: CarouselAnnouncerFunction = (
  index: number,
  totalSlides: number
) => {
  return `Elevated carousel slide ${index + 1} of ${totalSlides}`;
};
const FluentCarousel: React.FC = () => {
  return (
    <div className={carouselStyles.carouselRoot}>
      <Carousel
        className={carouselStyles.carouselContainer}
        appearance="elevated"
        groupSize={1}
        circular
        announcement={getAnnouncement}
      >
        <CarouselViewport>
          <CarouselSlider>
            {SLIDES.map((slide, idx) => (
              <BannerCard
                key={`slide-${idx}`}
                image={slide.image}
                title={slide.title}
                blurb={slide.blurb}
                cta={slide.cta}
              />
            ))}
          </CarouselSlider>
        </CarouselViewport>
        <CarouselNavContainer
          layout="inline"
          autoplayTooltip={{ content: "Autoplay", relationship: "label" }}
          nextTooltip={{ content: "Go to next", relationship: "label" }}
          prevTooltip={{ content: "Go to prev", relationship: "label" }}
        >
          <CarouselNav>
            {(index: number) => {
              return <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />;
            }}
          </CarouselNav>
        </CarouselNavContainer>
      </Carousel>
    </div>
  );
};

export default FluentCarousel;
