import React from 'react';
import '../assets/styles/AboutPage.css';

export default function AboutPage() {
  return (
    <div className="about-wrapper">
      <section className="about-section">
        <h1 className="about-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M12 3l9.5 7h-19L12 3zm0 3.84L6.42 10h11.16L12 6.84zM4 12v9h16v-9H4zm2 2h12v5H6v-5z" />
          </svg>
          About Us
        </h1>
        <p>
          Welcome to Our <strong>Blog Platform</strong> — a space where ideas,
          knowledge, and stories come to life. We believe everyone has something
          valuable to share, whether it's a deep technical insight, a fresh
          perspective on current events, or a personal journey worth telling.
          Our platform gives writers the tools to express themselves and reach
          readers worldwide.
        </p>
      </section>

      <section className="about-section">
        <h1 className="about-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.29L5.47 7 12 4.71 18.53 7 12 9.29zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          Our Mission
        </h1>
        <p>
          To empower writers and creators by providing a clean, fast, and
          user-friendly platform where content is the priority and community
          matters.
        </p>
      </section>

      <section className="about-section">
        <h1 className="about-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z" />
          </svg>
          What We Offer
        </h1>
        <ul className="offer-list">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bullet-icon"
              viewBox="0 0 24 24"
              fill="currentColor">
              <circle cx="12" cy="12" r="8" />
            </svg>
            Powerful writing tools — a distraction-free editor.
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bullet-icon"
              viewBox="0 0 24 24"
              fill="currentColor">
              <circle cx="12" cy="12" r="8" />
            </svg>
            Global reach — share your voice worldwide.
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bullet-icon"
              viewBox="0 0 24 24"
              fill="currentColor">
              <circle cx="12" cy="12" r="8" />
            </svg>
            Secure & reliable — we respect your content and privacy.
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bullet-icon"
              viewBox="0 0 24 24"
              fill="currentColor">
              <circle cx="12" cy="12" r="8" />
            </svg>
            Built for developers & readers alike.
          </li>
        </ul>
      </section>
    </div>
  );
}
