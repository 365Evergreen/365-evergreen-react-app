import React from 'react';
import '../WhatWeDo.css';

const WhatWeDo: React.FC = () => {
  return (
    <section className="whatWeDoRoot">
      <h1 className="whatWeDoTitle">What We Do</h1>
      <p className="whatWeDoDesc">
        We help organizations thrive with evergreen digital solutions. Our services include strategy, design, development, and ongoing support for modern web platforms.
      </p>
      <ul className="whatWeDoList">
        <li>Digital Strategy & Consulting</li>
        <li>Web & App Development</li>
        <li>UX/UI Design</li>
        <li>Cloud Integration</li>
        <li>Support & Optimization</li>
      </ul>
    </section>
  );
};

export default WhatWeDo;
