'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
  decay: number
}

export default function CometCursor(): null {
  const animFrameRef = useRef<number>(0)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 })
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 })
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    // Detect touch device to disable custom cursor and improve mobile performance
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    if (isTouch) return

    // Create and append comet cursor canvas
    const canvas = document.createElement('canvas')
    canvas.id = 'comet-cursor-canvas'
    Object.assign(canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '9999',
    })
    document.body.appendChild(canvas)
    canvasRef.current = canvas

    // Hide default cursor
    document.documentElement.style.cursor = 'none'

    const ctx = canvas.getContext('2d')!
    let width = 0
    let height = 0

    const resize = (): void => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const handleMouseMove = (e: MouseEvent): void => {
      lastMouseRef.current = { ...mouseRef.current }
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = (): void => {
      ctx.clearRect(0, 0, width, height)

      const dx = mouseRef.current.x - lastMouseRef.current.x
      const dy = mouseRef.current.y - lastMouseRef.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      // Emit comet tail particles
      if (speed > 0.5) {
        const count = Math.min(speed, 15)
        for (let i = 0; i < count; i++) {
          const angle =
            Math.atan2(dy, dx) + Math.PI + (Math.random() - 0.5) * 0.5
          const pSpeed = Math.random() * speed * 0.2
          particlesRef.current.push({
            x: mouseRef.current.x,
            y: mouseRef.current.y,
            vx: Math.cos(angle) * pSpeed,
            vy: Math.sin(angle) * pSpeed,
            life: 1.0,
            size: Math.random() * 3 + 1,
            decay: Math.random() * 0.02 + 0.01,
          })
        }
      }

      // Draw comet head glow
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        10
      )
      gradient.addColorStop(0, 'rgba(0, 255, 102, 1)')
      gradient.addColorStop(0.5, 'rgba(0, 255, 102, 0.4)')
      gradient.addColorStop(1, 'rgba(0, 255, 102, 0)')

      ctx.globalAlpha = 1
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 12, 0, Math.PI * 2)
      ctx.fill()

      // Update and draw tail particles
      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay

        if (p.life <= 0) {
          particles.splice(i, 1)
        } else {
          ctx.globalAlpha = p.life
          ctx.fillStyle = '#00FF66'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }
    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animFrameRef.current)
      canvas.remove()
      document.documentElement.style.cursor = ''
    }
  }, [])

  return null
}
