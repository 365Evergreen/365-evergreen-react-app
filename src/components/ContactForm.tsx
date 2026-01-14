import { useState } from 'react';
import { Input, Textarea, Button } from '@fluentui/react-components';
import { Send24Regular } from '@fluentui/react-icons';
import '../ContactForm.css';


export function ContactForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Australian phone: 10 digits, starting with 0
  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (!/^0\d{9}$/.test(cleaned)) {
      return 'Please enter a valid 10-digit Australian phone number starting with 0.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const phoneValidation = validatePhone(phone);
    setPhoneError(phoneValidation);
    if (phoneValidation) return;
    try {
      const response = await fetch(
        'https://ee9ffbbcb17ae277b5341496799d04.c5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/98236e1f3e914723bb2edd16e60e463a/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rO8yE4CSKoLtlYQ6ppTgB2geUhA_PfpkHkipXfhVV1k',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, surname, organisation, position, email, phone, subject, message })
        }
      );
      if (!response.ok) {
        throw new Error('Failed to send. Please try again.');
      }
      setSubmitted(true);
      setName('');
      setSurname('');
      setOrganisation('');
      setPosition('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    }
  };

  return (
    <section id="contact" className="contact-root">
      <div className="contact-wrapper">
        <div className="contact-info">
          <h2 className="fluent-title2" style={{ textAlign: 'left', width: '100%' }}>How can we help?</h2>
        </div>
        <div className="contact-container">
          {submitted && (
            <div className="contact-success" role="status">
              Thank you for reaching out! We'll get back to you soon. <button type="button" className="contact-dismiss" onClick={() => setSubmitted(false)}>Dismiss</button>
            </div>
          )}
          {error && (
            <div className="contact-error" role="alert">
              {error} <button type="button" className="contact-dismiss" onClick={() => setError(null)}>Dismiss</button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="contact-form contact-form-grid">
            <div className="contact-form-row">
              <div>
                <label className="contact-label fluent-body1" htmlFor="contact-name">First name</label>
                <Input id="contact-name" className="contact-input" required value={name} onChange={(_, d) => setName(d.value)} placeholder="John" />
              </div>
              <div>
                <label className="contact-label fluent-body1" htmlFor="contact-surname">Surname</label>
                <Input id="contact-surname" className="contact-input" required value={surname} onChange={(_, d) => setSurname(d.value)} placeholder="Doe" />
              </div>
            </div>
            <div className="contact-form-row">
              <div>
                <label className="contact-label fluent-body1" htmlFor="contact-organisation">Organisation name</label>
                <Input id="contact-organisation" className="contact-input" required value={organisation} onChange={(_, d) => setOrganisation(d.value)} placeholder="Company or organisation" />
              </div>
              <div>
                <label className="contact-label fluent-body1" htmlFor="contact-position">Position title</label>
                <Input id="contact-position" className="contact-input" required value={position} onChange={(_, d) => setPosition(d.value)} placeholder="Your role or title" />
              </div>
            </div>
            <div className="contact-form-row">
              <div>
                <label className="contact-label fluent-body1" htmlFor="contact-email">Email address</label>
                <Input id="contact-email" className="contact-input" type="email" required value={email} onChange={(_, d) => setEmail(d.value)} placeholder="john@example.com" />
              </div>
              <div>
                <label className="contact-label fluent-body1" htmlFor="contact-phone">Phone number</label>
                <Input id="contact-phone" className="contact-input" type="tel" inputMode="numeric" pattern="0[0-9]{9}" maxLength={10} required value={phone} onChange={(_, d) => setPhone(d.value.replace(/\D/g, ''))} placeholder="0412345678" />
                {phoneError && <div className="contact-error" role="alert">{phoneError}</div>}
              </div>
            </div>
            <div className="contact-form-row">
              <div style={{ gridColumn: '1 / span 2' }}>
                <label className="contact-label fluent-body1" htmlFor="contact-subject">How can we help?</label>
                <select id="contact-subject" className="contact-input" required value={subject} onChange={e => setSubject(e.target.value)}>
                  <option value="" disabled>Select a subject</option>
                  <option value="Communication">Communication</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Business apps">Business apps</option>
                  <option value="Process automation">Process automation</option>
                  <option value="Governance and security">Governance and security</option>
                </select>
              </div>
            </div>
            <div className="contact-form-row">
              <div style={{ gridColumn: '1 / span 2' }}>
                <label className="contact-label fluent-body1" htmlFor="contact-message">Message</label>
                <Textarea id="contact-message" className="contact-message" required rows={4} value={message} onChange={(_, d) => setMessage(d.value)} placeholder="Tell us more about your inquiry..." />
              </div>
            </div>
            <div className="contact-form-row">
              <div style={{ gridColumn: '1 / span 2', textAlign: 'center' }}>
                <Button className="contact-submit" appearance="primary" type="submit">
                  Send Message <Send24Regular />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
