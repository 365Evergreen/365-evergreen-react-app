import { Link } from '@fluentui/react-components';
import { LeafThree24Regular } from '@fluentui/react-icons';

export function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo"><LeafThree24Regular /></div>
          <div>
            <div className="footer-title fluent-title3">365 Evergreen</div>
            <div className="footer-desc">Empowering individuals to live sustainably, one day at a time. Join our community and make every day count.</div>
            <div className="footer-socials">
              <a href="#" className="footer-social"><span aria-label="Twitter">🐦</span></a>
              <a href="#" className="footer-social"><span aria-label="GitHub">🐙</span></a>
              <a href="#" className="footer-social"><span aria-label="LinkedIn">💼</span></a>
            </div>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-link-group">
            <div className="footer-link-title fluent-subtitle2">Product</div>
            <Link href="#">Features</Link>
            <Link href="#">Pricing</Link>
            <Link href="#">Resources</Link>
            <Link href="#">Updates</Link>
          </div>
          <div className="footer-link-group">
            <div className="footer-link-title fluent-subtitle2">Company</div>
            <Link href="#">About Us</Link>
            <Link href="#">Careers</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Blog</Link>
          </div>
          <div className="footer-link-group">
            <div className="footer-link-title fluent-subtitle2">Legal</div>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
            <Link href="#">Disclaimer</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} 365 Evergreen. All rights reserved.</div>
        <div className="footer-made fluent-caption1">Made with <span className="footer-heart" role="img" aria-label="love">💚</span> for the planet</div>
      </div>
    </footer>
  );
}
