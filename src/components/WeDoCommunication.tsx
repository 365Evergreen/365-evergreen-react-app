import React from "react";
import "../WeDoCommunication.css";
import { VanillaAccordion } from "./VanillaAccordion";

const WeDoCommunication: React.FC = () => (
  <section className="we-do-communication-bg">
    <div className="we-do-communication-container">
      <h2 className="we-do-communication__heading">Communication</h2>
      <p className="we-do-communication__description">This is a placeholder description for the communication section. Add your real content here to describe what this section is about.</p>
      <div className="we-do-communication__columns">
        <div className="we-do-communication__accordion">
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
        <div className="we-do-communication__calendar">
          <div className="we-do-communication__calendar-inner">
            <h3>Calendar Placeholder</h3>
            {/* You can replace this with a Calendar component or embed */}
          </div>
        </div>
      </div>
      <p className="we-do-communication__footer">Yo cunt</p>
    </div>
  </section>
);

export default WeDoCommunication;
