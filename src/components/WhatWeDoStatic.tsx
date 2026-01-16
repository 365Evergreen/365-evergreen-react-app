import React from "react";
import ResponsiveVideoPlayer from "./ResponsiveVideoPlayer";

import WeDoCollaboration from "./WeDoCollaboration";
import WeDoCommunication from "./WeDoCommunication";





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
    <WeDoCommunication />
    <WeDoCollaboration />
    <TagCloud />
    <ResponsiveVideoPlayer
      src="https://pauli.blob.core.windows.net/365-evergreen/videos/Recording-20260116_084354.webm"
      title="Evergreen Demo Video"
      aspectRatio="16:9"
    />
  </main>
);

export default WhatWeDoStatic;
