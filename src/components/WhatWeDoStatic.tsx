import React from "react";
import { VanillaAccordion } from "./VanillaAccordion";
import ResponsiveVideoPlayer from "./ResponsiveVideoPlayer";

// Example: Hero section with cover image
const HeroSection: React.FC = () => (
  <section style={{ position: "relative", background: "#decce3", padding: 0 }}>
    <img
      src="https://365evergreen.com/wp-content/uploads/2026/01/377150-PPL-Hero-Background.png"
      alt="Hero Background"
      style={{ width: "100%", height: "auto", objectFit: "cover", position: "absolute", top: 0, left: 0, zIndex: 0 }}
    />
    <div style={{ position: "relative", zIndex: 1, padding: "3rem 0" }}>
      {/* Columns layout */}
      <div style={{ display: "flex", gap: 32 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Accordion Example */}
          <VanillaAccordion
            items={[
              {
                title: "Beautiful canvases",
                panels: [
                  { title: "Panel 1", content: "Some placeholder content here." },
                  { title: "Panel 2", content: "More placeholder content." },
                ],
              },
              {
                title: "All the right channels",
                panels: [
                  { title: "Panel 1", content: "Another panel content." },
                ],
              },
            ]}
          />
        </div>
        <div style={{ flex: 2, minWidth: 0 }}>
          {/* Placeholder for calendar or other content */}
          <div style={{ background: "#fff", borderRadius: 8, minHeight: 300, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <h3>Calendar Placeholder</h3>
            {/* You can replace this with a Calendar component or embed */}
          </div>
        </div>
      </div>
      <p style={{ textAlign: "center", fontSize: 32, marginTop: 48 }}>Yo cunt</p>
    </div>
  </section>
);

// Example: Collaboration section with cover image
const CollaborationSection: React.FC = () => (
  <section style={{ position: "relative", background: "#adaeae", padding: 0, marginTop: 48 }}>
    <img
      src="https://365evergreen.com/wp-content/uploads/2026/01/anywhere-1024x575.png"
      alt="Collaboration Background"
      style={{ width: "100%", height: "auto", objectFit: "cover", position: "absolute", top: 0, left: 0, zIndex: 0 }}
    />
    <div style={{ position: "relative", zIndex: 1, padding: "3rem 0" }}>
      <p style={{ textAlign: "left", fontSize: 32 }}>Yo cunt</p>
      <div style={{ height: 297 }} aria-hidden="true" />
    </div>
  </section>
);

// Example: Tag cloud
const TagCloud: React.FC = () => (
  <div style={{ textAlign: "center", margin: "2rem 0" }}>
    <a href="#" style={{ fontSize: 22, margin: 8 }}>corporis</a>
    <a href="#" style={{ fontSize: 8, margin: 8 }}>Email</a>
    <a href="#" style={{ fontSize: 8, margin: 8 }}>non</a>
    <a href="#" style={{ fontSize: 8, margin: 8 }}>occaecati</a>
    <a href="#" style={{ fontSize: 14.3, margin: 8 }}>Power Automate</a>
    <a href="#" style={{ fontSize: 18.5, margin: 8 }}>Save time</a>
    <a href="#" style={{ fontSize: 8, margin: 8 }}>totam</a>
  </div>
);



// Main static page component
const WhatWeDoStatic: React.FC = () => (
  <main>
    <HeroSection />
    <CollaborationSection />
    <TagCloud />
    <ResponsiveVideoPlayer
      src="https://pauli.blob.core.windows.net/365-evergreen/videos/Recording-20260116_084354.webm"
      title="Evergreen Demo Video"
      aspectRatio="16:9"
    />
  </main>
);

export default WhatWeDoStatic;
