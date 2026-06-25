'use client'
import { useEffect, useState } from 'react'

const LINES = ['Initializing portfolio', 'Loading full-stack work', 'Welcome to my portfolio!', "It's Me!"]

export default function Intro({ onComplete }) {
  const [line, setLine] = useState(0)

  useEffect(() => {
    const tick = setInterval(() => {
      setLine((value) => {
        if (value >= LINES.length - 1) {
          clearInterval(tick)
          setTimeout(onComplete, 700)
          return value
        }
        return value + 1
      })
    }, 520)
    return () => clearInterval(tick)
  }, [onComplete])

  return (
    <section className="intro-screen" aria-label="Loading portfolio">
      {/* AKM — teal colour with glow */}
      <div className="intro-mark" style={{
        color: '#006D6D',
        textShadow: '0 0 48px rgba(0,109,109,0.7), 0 0 90px rgba(0,109,109,0.3)',
      }}>
        AKM
      </div>
      <div className="intro-console">
        <span className="console-prefix" style={{ color:'#006D6D' }}>$</span>
        <span style={{ color:'rgba(255,255,255,0.85)' }}>{LINES[line]}</span>
        <span className="console-caret" style={{ background:'#006D6D' }}/>
      </div>
    </section>
  )
}