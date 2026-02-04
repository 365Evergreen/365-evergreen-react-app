import React from "react";
import WhatWeDoHero from "./WhatWeDoHero";
import { WhatWeDoNav } from "./WhatWeDoNav";
import ResponsiveVideoPlayer from "./ResponsiveVideoPlayer";
import WeDoCollaboration from "./WeDoCollaboration/WeDoCollaboration";
import WeDoCommunication from "./WeDoCommunication/WeDoCommunication";
import WeDoGovernance from "./WeDoGovernance";
import WeDoAutomation from "./WeDoAutomation";
import WeDoApps from "./WeDoApps/WeDoApps";
import WeDoSupport from "./WeDoSupport";





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
    <WhatWeDoHero />
    <WhatWeDoNav />
    <WeDoCommunication />
    <WeDoCollaboration />
    <WeDoAutomation/>
    <WeDoApps />
    <WeDoGovernance />
    <WeDoSupport />
    <TagCloud />
    <ResponsiveVideoPlayer
      src="https://365evergreendev.blob.core.windows.net/365evergreen/videos/Recording-20260116_084354.webm"
      title="Evergreen Demo Video"
      aspectRatio="16:9"
    />
  </main>
);

export default WhatWeDoStatic;
