import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
    './src/app/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cosmic Voyager Brand Palette
        'void-black': '#05070A',
        'starlight-white': '#F9FAFB',
        'nebula-purple': '#4C1D95',
        'deep-navy': '#0B0D17',
        'cosmic-teal': '#82B2C0',
        // Material Design Surface Tokens
        surface: '#00161c',
        'surface-dim': '#00161c',
        'surface-bright': '#263d43',
        'surface-container-lowest': '#001115',
        'surface-container-low': '#061f24',
        'surface-container': '#0a2328',
        'surface-container-high': '#162d33',
        'surface-container-highest': '#21383e',
        'surface-variant': '#21383e',
        'on-surface': '#cee7ee',
        'on-surface-variant': '#ccc3d4',
        'inverse-surface': '#cee7ee',
        'inverse-on-surface': '#1d343a',
        // Primary
        primary: '#d3bbff',
        'on-primary': '#3f0689',
        'primary-container': '#4c1d95',
        'on-primary-container': '#b994ff',
        'inverse-primary': '#6f46b9',
        'primary-fixed': '#ebdcff',
        'primary-fixed-dim': '#d3bbff',
        'on-primary-fixed': '#260059',
        'on-primary-fixed-variant': '#572ba0',
        'surface-tint': '#d3bbff',
        // Secondary
        secondary: '#e2e2ec',
        'on-secondary': '#2e303b',
        'secondary-container': '#444652',
        'on-secondary-container': '#b4b4c2',
        'secondary-fixed': '#e1e1f0',
        'secondary-fixed-dim': '#e2e2ec',
        'on-secondary-fixed': '#191b26',
        'on-secondary-fixed-variant': '#444652',
        // Tertiary
        tertiary: '#c5c7c8',
        'on-tertiary': '#2e3132',
        'tertiary-container': '#3a3d3e',
        'on-tertiary-container': '#a6a7a8',
        'tertiary-fixed': '#e1e3e4',
        'tertiary-fixed-dim': '#c5c7c8',
        'on-tertiary-fixed': '#191c1d',
        'on-tertiary-fixed-variant': '#454748',
        // Error
        error: '#ffb4ab',
        'on-error': '#690005',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',
        // Background / Outline
        background: '#00161c',
        'on-background': '#cee7ee',
        outline: '#958e9e',
        'outline-variant': '#4a4452',
      },
      fontFamily: {
        'display-lg': ['var(--font-sora)', 'sans-serif'],
        'display-lg-mobile': ['var(--font-sora)', 'sans-serif'],
        'headline-lg': ['var(--font-sora)', 'sans-serif'],
        'headline-md': ['var(--font-sora)', 'sans-serif'],
        'body-lg': ['var(--font-inter)', 'sans-serif'],
        'body-md': ['var(--font-inter)', 'sans-serif'],
        'label-caps': ['var(--font-jetbrains-mono)', 'monospace'],
        'label-md': ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        // Fluid typography — scales continuously from 375px → 1280px viewport
        // clamp(mobile-min, fluid-midpoint, desktop-max)
        'display-lg':        ['clamp(1.75rem, 5vw + 0.5rem, 3.25rem)',      { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg-mobile': ['clamp(1.5rem,  4vw + 0.4rem, 1.75rem)',      { lineHeight: '1.2', fontWeight: '700' }],
        'headline-lg':       ['clamp(1.25rem, 2vw + 0.75rem, 1.75rem)',     { lineHeight: '1.3', fontWeight: '600' }],
        'headline-md':       ['clamp(1.0rem,  1.5vw + 0.6rem, 1.375rem)',   { lineHeight: '1.4', fontWeight: '500' }],
        'headline-sm':       ['clamp(0.9rem,  1vw + 0.55rem, 1.125rem)',    { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg':           ['clamp(0.9rem,  0.5vw + 0.75rem, 1.0625rem)', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md':           ['clamp(0.8125rem,0.4vw + 0.7rem, 0.9375rem)', { lineHeight: '1.5', fontWeight: '400' }],
        'label-caps':        ['clamp(0.625rem, 0.3vw + 0.55rem, 0.6875rem)',{ lineHeight: '1.2', letterSpacing: '0.1em', fontWeight: '500' }],
        'label-md':          ['clamp(0.75rem,  0.3vw + 0.65rem, 0.8125rem)',{ lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      spacing: {
        gutter: '24px',
        'margin-mobile': '20px',
        'margin-desktop': '64px',
        unit: '8px',
        'container-max': '1280px',
      },
      maxWidth: {
        'container-max': '1280px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-slow-reverse': 'spin 15s linear infinite reverse',
        scan: 'scan 4s linear infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blink: 'blink 0.8s step-end infinite',
        'swirl-distort': 'swirl-distort 1s linear infinite',
        'pulse-aura': 'pulse-aura 2s infinite ease-in-out',
      },
      keyframes: {
        scan: {
          '0%': { top: '0' },
          '100%': { top: '100%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(211, 187, 255, 0.7)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(211, 187, 255, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(211, 187, 255, 0)' },
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#d3bbff' },
        },
        'swirl-distort': {
          from: { transform: 'rotate(0deg) scale(1)' },
          to: { transform: 'rotate(360deg) scale(1.5)' },
        },
        'pulse-aura': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.1)', opacity: '0.9' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
