"use client";

import { FormEvent, useState } from "react";

export function ContactSection() {
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !service) return;

    window.location.href = `mailto:?subject=${encodeURIComponent(service)}&body=${encodeURIComponent(`Contact email: ${email}`)}`;
  };

  return (
    <section id="get-in-touch" className="contact-section">
      <h2>LET&apos;S TALK ABOUT</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="contact-service-field">
          <span className="sr-only">What would you like to discuss?</span>
          <select
            value={service}
            onChange={(event) => setService(event.target.value)}
            onFocus={() => setIsServiceOpen(true)}
            onBlur={() => setIsServiceOpen(false)}
            required
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Figma to Code">Figma to Code</option>
            <option value="Web Development">Web Development</option>
            <option value="Dev Ops">Dev Ops</option>
          </select>
          <span
            className={`contact-select-arrow${isServiceOpen ? " is-open" : ""}`}
            aria-hidden="true"
          />
        </label>

          <div className="contact-email-block">
            <h3>EMAIL TO CONTACT</h3>
            <label className="contact-email-field">
              <span className="sr-only">Your email address</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Write your email..."
                required
              />
            </label>
          </div>

        <button type="submit">
          <span>SEND</span>
          <svg className="contact-send-arrow" aria-hidden="true" viewBox="0 0 24 16" fill="none">
            <path d="M1 8H21M14 1L21 8L14 15" />
          </svg>
        </button>
      </form>
    </section>
  );
}
