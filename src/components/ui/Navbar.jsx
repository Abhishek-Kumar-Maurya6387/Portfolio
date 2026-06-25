'use client'

import { useEffect, useState } from 'react'

const NAV = [
  { label: 'Home', href: 'home' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projects', href: 'space-portfolio' },
  { label: 'Experience', href: 'space-portfolio' },
  { label: 'Resume', href: 'space-portfolio' },
  { label: 'Contact', href: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const root = document.getElementById('scroll-root')
    if (!root) return

    const onScroll = () => {
      setScrolled(root.scrollTop > 50)
      const sectionIds = ['home', 'skills', 'space-portfolio', 'contact']
      const scrollMid = root.scrollTop + root.clientHeight / 2
      let next = 'home'

      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element && element.offsetTop <= scrollMid) next = id
      })

      setActive(next)
    }

    root.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => root.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setOpen(false)
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? 'rgba(0,0,0,.9)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(0,109,109,.2)' : 'none', transition: 'all .4s ease' }}>
      <div onClick={() => go('home')} style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.45rem', fontWeight: 800, color: '#006D6D', cursor: 'pointer', letterSpacing: '-.02em', textShadow: '0 0 22px rgba(0,109,109,.6)' }} data-hover>
        AKM<span style={{ color: 'rgba(255,255,255,.3)' }}>.</span>
      </div>
      <div style={{ display: 'flex', gap: '1.6rem', alignItems: 'center' }} className="nav-desktop">
        {NAV.map((item) => (
          <button key={item.label} onClick={() => go(item.href)} data-hover style={{ background: 'none', border: 'none', fontFamily: "'Space Grotesk',sans-serif", fontSize: '.82rem', fontWeight: 500, color: active === item.href ? '#006D6D' : 'rgba(255,255,255,.55)', cursor: 'pointer', padding: '.3rem 0', position: 'relative', transition: 'color .3s', whiteSpace: 'nowrap', textShadow: active === item.href ? '0 0 12px rgba(0,109,109,.5)' : 'none' }}>
            {item.label}
            {active === item.href && <span style={{ position: 'absolute', bottom: '-2px', left: 0, right: 0, height: '1.5px', background: '#006D6D', boxShadow: '0 0 8px #006D6D' }} />}
          </button>
        ))}
      </div>
      <button onClick={() => setOpen(!open)} className="nav-ham" data-hover style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 8 }}>
        {[0, 1, 2].map((barIndex) => (
          <span key={barIndex} style={{ display: 'block', width: 24, height: 2, background: '#006D6D', transition: 'all .3s', transform: open ? (barIndex === 0 ? 'rotate(45deg) translate(5px,5px)' : barIndex === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'scaleX(0)') : 'none', boxShadow: '0 0 6px rgba(0,109,109,.6)' }} />
        ))}
      </button>
      {open && (
        <div style={{ position: 'fixed', top: 64, left: 0, right: 0, background: 'rgba(0,0,0,.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,109,109,.2)', padding: '1.2rem 2rem', display: 'flex', flexDirection: 'column', gap: '.8rem', zIndex: 999 }}>
          {NAV.map((item) => (
            <button key={item.href} onClick={() => go(item.href)} style={{ background: 'none', border: 'none', fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.1rem', fontWeight: 500, color: active === item.href ? '#006D6D' : 'rgba(255,255,255,.7)', cursor: 'pointer', textAlign: 'left', padding: '.5rem 0', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
              {item.label}
            </button>
          ))}
        </div>
      )}
      <style>{`@media(max-width:860px){.nav-desktop{display:none!important}.nav-ham{display:flex!important}}`}</style>
    </nav>
  )
}
