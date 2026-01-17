import React, { useState } from 'react';
import '../../TenantAuditForm.css';
import { Button } from '@fluentui/react-components';

interface TenantAuditFormProps {
  onSubmit?: (data: TenantAuditFormData) => void;
}

export interface TenantAuditFormData {
  firstName: string;
  surname: string;
  email: string;
  organisation: string;
  message: string;
}

export const TenantAuditForm: React.FC<TenantAuditFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState<TenantAuditFormData>({
    firstName: '',
    surname: '',
    email: '',
    organisation: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">
        First Name
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          className="input"
          required
        />
      </label>
      <label className="label">
        Surname
        <input
          type="text"
          name="surname"
          value={form.surname}
          onChange={handleChange}
          className="input"
          required
        />
      </label>
      <label className="label">
        Email Address
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="input"
          required
        />
      </label>
      <label className="label">
        Organisation
        <input
          type="text"
          name="organisation"
          value={form.organisation}
          onChange={handleChange}
          className="input"
          required
        />
      </label>
      <label className="label">
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className="textarea"
          required
        />
      </label>
      <Button type="submit" appearance="primary">Submit</Button>
    </form>
  );
};
