'use client'

import { FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const EMAIL = 'abhishek.2428cseai17@kiet.edu'

export default function Hero() {
  return (
    <section id="home" className="hero section-band">
      <video className="hero-video" src="/videos/hero-bg.mp4" autoPlay muted loop playsInline />
      <div className="hero-shade" />

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-role">Full Stack Developer</p>
          <p className="hero-intro">Hello, I'm</p>
          <h1>
            Abhishek Kumar <span>Maurya</span>
          </h1>
          <p className="hero-text">
            I build practical, polished web products with React, Next.js, JavaScript, and clean backend thinking.
            My work focuses on useful interfaces, strong fundamentals, and details that feel finished.
          </p>

          <div className="hero-actions">
            <a className="btn primary" href="/resume/resume.pdf" download data-hover>
              <FiDownload /> Resume
            </a>
            <a className="btn ghost" href="#projects" data-hover>
              View work
            </a>
          </div>

          <div className="hero-socials" aria-label="Social links">
            <a href="https://github.com/Abhishek-Kumar-Maurya6387" target="_blank" rel="noreferrer" aria-label="GitHub" data-hover>
              <FiGithub />
            </a>
            <a href="https://www.linkedin.com/in/abhishek-kumar-maurya-1a1597329" target="_blank" rel="noreferrer" aria-label="LinkedIn" data-hover>
              <FiLinkedin />
            </a>
            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`} target="_blank" rel="noreferrer" aria-label="Open Gmail" data-hover>
              <FiMail />
            </a>
            <a href="https://www.instagram.com/raja_banarasi63" target="_blank" rel="noreferrer" aria-label="Instagram" data-hover>
              <FaInstagram />
            </a>
            <a href="https://x.com/raja_banarasi63" target="_blank" rel="noreferrer" aria-label="X" data-hover>
              <FaXTwitter />
            </a>
          </div>
        </div>

        <div className="portrait-wrap" aria-label="Profile image">
          <div className="portrait-frame">
            <img src="/images/profile.png" alt="Abhishek Kumar Maurya" />
          </div>
          <div className="status-card">
            <span className="pulse" />
            Available for projects
          </div>
        </div>
      </div>
    </section>
  )
}
