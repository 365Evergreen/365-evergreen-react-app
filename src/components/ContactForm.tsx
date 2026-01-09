import { useState } from 'react';
import { Input, Textarea, Button } from '@fluentui/react-components';
import { Mail24Regular, People24Regular, Chat24Regular, Send24Regular } from '@fluentui/react-icons';
import '../ContactForm.css';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        'https://prod-16.westeurope.logic.azure.com:443/workflows/f8619180-9ae0-451c-9b70-f775f1e3e4b1/triggers/manual/paths/invoke?api-version=2016-10-01',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        }
      );
      if (!response.ok) {
        throw new Error('Failed to send. Please try again.');
      }
      setSubmitted(true);
      setName('');
      setEmail('');
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
          <button className="contact-info-cta">Get in Touch</button>
          <h2 className="contact-info-title fluent-title2">Let's Start a Conversation</h2>
          <p className="contact-info-desc">
            Have questions about sustainable living? Want to join our community? <br />
            We'd love to hear from you.
          </p>
          <div className="contact-info-list">
            <div className="contact-info-item">
              <span className="contact-info-icon"><Mail24Regular /></span>
              <div>
                <div className="contact-info-label fluent-body1Strong">Email Us</div>
                <div className="contact-info-text">hello@365evergreen.com</div>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon"><People24Regular /></span>
              <div>
                <div className="contact-info-label fluent-body1Strong">Join Our Community</div>
                <div className="contact-info-text">Connect with 50,000+ eco-conscious members</div>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon"><Chat24Regular /></span>
              <div>
                <div className="contact-info-label fluent-body1Strong">Response Time</div>
                <div className="contact-info-text">We typically respond within 24 hours</div>
              </div>
            </div>
          </div>
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
          <form onSubmit={handleSubmit} className="contact-form">
            <label className="contact-label fluent-body1" htmlFor="contact-name">Your Name</label>
            <Input id="contact-name" className="contact-input" required value={name} onChange={(_, d) => setName(d.value)} placeholder="John Doe" />

            <label className="contact-label fluent-body1" htmlFor="contact-email">Email Address</label>
            <Input id="contact-email" className="contact-input" type="email" required value={email} onChange={(_, d) => setEmail(d.value)} placeholder="john@example.com" />

            <label className="contact-label fluent-body1" htmlFor="contact-subject">Subject</label>
            <Input id="contact-subject" className="contact-input" required value={subject} onChange={(_, d) => setSubject(d.value)} placeholder="How can we help?" />

            <label className="contact-label fluent-body1" htmlFor="contact-message">Message</label>
            <Textarea id="contact-message" className="contact-message" required rows={4} value={message} onChange={(_, d) => setMessage(d.value)} placeholder="Tell us more about your inquiry..." />

            <Button className="contact-submit" appearance="primary" type="submit">
              Send Message <Send24Regular />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
