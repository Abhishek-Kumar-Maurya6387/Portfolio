'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Cursor         = dynamic(()=>import('../components/ui/Cursor'),               { ssr:false })
const Navbar         = dynamic(()=>import('../components/ui/Navbar'),               { ssr:false })
const Intro          = dynamic(()=>import('../components/sections/Intro'),          { ssr:false })
const Hero           = dynamic(()=>import('../components/sections/Hero'),           { ssr:false })
const Skills         = dynamic(()=>import('../components/sections/Skills'),         { ssr:false })
const SpacePortfolio = dynamic(()=>import('../components/sections/SpacePortfolio'), { ssr:false })
const Contact        = dynamic(()=>import('../components/sections/Contact'),        { ssr:false })

export default function Home() {
  const [done, setDone] = useState(false)

  // Force scroll to top on load — hero always first
  useEffect(() => {
    const root = document.getElementById('scroll-root')
    if (root) root.scrollTop = 0
  }, [done])

  return (
    <>
      <Cursor/>
      {!done && <Intro onComplete={() => setDone(true)}/>}
      <div
        id="scroll-root"
        style={{
          opacity: done ? 1 : 0,
          transition: 'opacity .8s ease',
          pointerEvents: done ? 'all' : 'none',
          scrollSnapType: 'y mandatory',
          overflowY: 'scroll',
          height: '100vh',
        }}
      >
        <Navbar/>
        <Hero/>
        <Skills/>
        <SpacePortfolio/>
        <Contact/>
      </div>
    </>
  )
}