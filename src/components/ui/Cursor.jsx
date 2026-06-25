'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const frameRef = useRef(0)

  useEffect(() => {
    if (window.innerWidth < 768) return undefined

    const move = (event) => {
      mousePos.current = { x: event.clientX, y: event.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${event.clientX}px`
        dotRef.current.style.top = `${event.clientY}px`
      }

      const trail = document.createElement('span')
      trail.className = 'cursor-trail'
      trail.style.left = `${event.clientX}px`
      trail.style.top = `${event.clientY}px`
      document.body.appendChild(trail)
      setTimeout(() => trail.remove(), 560)
    }

    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.14
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.14
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      frameRef.current = requestAnimationFrame(animate)
    }

    const enter = () => {
      dotRef.current?.classList.add('hovering')
      ringRef.current?.classList.add('hovering')
    }
    const leave = () => {
      dotRef.current?.classList.remove('hovering')
      ringRef.current?.classList.remove('hovering')
    }
    const attach = () => {
      document.querySelectorAll('a, button, input, textarea, [data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }

    document.addEventListener('mousemove', move)
    frameRef.current = requestAnimationFrame(animate)
    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(frameRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <span ref={dotRef} className="cursor-dot" />
      <span ref={ringRef} className="cursor-ring" />
    </>
  )
}
