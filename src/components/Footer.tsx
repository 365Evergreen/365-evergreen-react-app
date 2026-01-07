

import { Link } from '@fluentui/react-components';

export function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} 365 Evergreen. All rights reserved.</p>
        <div>
          <Link href="#" className="footer-social">Twitter</Link>
          <Link href="#" className="footer-social">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
}
