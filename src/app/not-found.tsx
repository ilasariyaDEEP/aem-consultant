'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let stars: Array<{ x: number; y: number; r: number; opacity: number; speed: number }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      stars = []
      const count = Math.floor((canvas.width * canvas.height) / 4000)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.2,
          opacity: Math.random() * 0.7 + 0.1,
          speed: Math.random() * 0.4 + 0.05,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(211, 187, 255, ${star.opacity})`
        ctx.fill()
        star.opacity += star.speed * 0.02
        if (star.opacity > 0.9 || star.opacity < 0.05) star.speed *= -1
      })
      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void">
      {/* Star particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Radial glow behind 404 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(76, 29, 149, 0.18) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <div
        className="relative flex flex-col items-center text-center px-6"
        style={{ zIndex: 2 }}
      >
        {/* Glitch 404 number */}
        <div className="glitch-wrapper mb-2" aria-label="404">
          <span className="glitch-text" data-text="404">404</span>
        </div>

        {/* SIGNAL LOST label */}
        <p
          className="font-mono text-xs tracking-[0.22em] uppercase mb-6"
          style={{ color: 'rgba(206, 231, 238, 0.45)', letterSpacing: '0.22em' }}
        >
          Signal Lost
        </p>

        {/* Main headline */}
        <h1
          className="font-bold mb-4"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '2rem',
            color: '#F9FAFB',
            lineHeight: 1.2,
          }}
        >
          Lost in the Void
        </h1>

        {/* Subtext */}
        <p
          className="mb-10 leading-relaxed"
          style={{
            color: 'rgba(206, 231, 238, 0.55)',
            fontSize: '0.95rem',
            maxWidth: '400px',
          }}
        >
          The coordinates you entered do not exist in this sector. The page may have drifted out of
          orbit or never existed.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(76,29,149,0.5)]"
            style={{
              background: 'linear-gradient(135deg, #4C1D95 0%, #6d28d9 100%)',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Return to Mission Control
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#d3bbff',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Send a Message
          </Link>
        </div>

        {/* Floating debris particles (CSS only) */}
        <div className="debris-field pointer-events-none select-none" aria-hidden>
          {['✦', '·', '✦', '·', '✦'].map((glyph, i) => (
            <span key={i} className={`debris debris-${i + 1}`}>
              {glyph}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bg-void {
          background-color: #05070a;
        }

        /* ── Glitch effect ── */
        .glitch-wrapper {
          position: relative;
          display: inline-block;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .glitch-text {
          display: block;
          font-family: 'Sora', sans-serif;
          font-size: clamp(5rem, 18vw, 9rem);
          font-weight: 800;
          color: #d3bbff;
          letter-spacing: -0.03em;
          position: relative;
          animation: glitch-flicker 4s infinite;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        .glitch-text::before {
          color: #5b8b99;
          animation: glitch-shift-1 4s infinite;
          opacity: 0.7;
        }

        .glitch-text::after {
          color: #a78bfa;
          animation: glitch-shift-2 4s infinite;
          opacity: 0.6;
        }

        @keyframes glitch-flicker {
          0%, 94%, 96%, 98%, 100% { opacity: 1; }
          95%, 97%, 99% { opacity: 0.85; }
        }

        @keyframes glitch-shift-1 {
          0%, 90%, 100% { transform: translate(0, 0); clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%); opacity: 0; }
          91% { transform: translate(-3px, 1px); clip-path: polygon(0 25%, 100% 25%, 100% 45%, 0 45%); opacity: 0.7; }
          92% { transform: translate(3px, -1px); clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); opacity: 0.7; }
          93% { transform: translate(0, 0); opacity: 0; }
        }

        @keyframes glitch-shift-2 {
          0%, 90%, 100% { transform: translate(0, 0); clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); opacity: 0; }
          91% { transform: translate(3px, -1px); clip-path: polygon(0 55%, 100% 55%, 100% 70%, 0 70%); opacity: 0.6; }
          92% { transform: translate(-3px, 1px); clip-path: polygon(0 20%, 100% 20%, 100% 35%, 0 35%); opacity: 0.6; }
          93% { transform: translate(0, 0); opacity: 0; }
        }

        /* ── Floating debris ── */
        .debris-field {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .debris {
          position: absolute;
          color: rgba(211, 187, 255, 0.25);
          font-size: 1rem;
          animation: float-debris linear infinite;
        }

        .debris-1 { left: 12%; top: 20%; animation-duration: 12s; animation-delay: 0s; font-size: 0.7rem; }
        .debris-2 { left: 80%; top: 35%; animation-duration: 9s; animation-delay: 2s; font-size: 0.5rem; }
        .debris-3 { left: 25%; top: 75%; animation-duration: 14s; animation-delay: 1s; font-size: 0.8rem; }
        .debris-4 { left: 70%; top: 80%; animation-duration: 10s; animation-delay: 3s; font-size: 0.45rem; }
        .debris-5 { left: 55%; top: 15%; animation-duration: 11s; animation-delay: 0.5s; font-size: 0.65rem; }

        @keyframes float-debris {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
          50% { opacity: 0.35; }
          100% { transform: translateY(-60px) rotate(20deg); opacity: 0.05; }
        }
      `}</style>
    </div>
  )
}
