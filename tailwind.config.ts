import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cosmic Voyager Brand Palette
        'void-black': '#05070A',
        'starlight-white': '#F9FAFB',
        'nebula-purple': '#4C1D95',
        'deep-navy': '#0B0D17',
        'cosmic-teal': '#5B8B99',
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
        secondary: '#c5c5d4',
        'on-secondary': '#2e303b',
        'secondary-container': '#444652',
        'on-secondary-container': '#b4b4c2',
        'secondary-fixed': '#e1e1f0',
        'secondary-fixed-dim': '#c5c5d4',
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
        'display-lg': ['Sora', 'sans-serif'],
        'display-lg-mobile': ['Sora', 'sans-serif'],
        'headline-lg': ['Sora', 'sans-serif'],
        'headline-md': ['Sora', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'label-caps': ['"JetBrains Mono"', 'monospace'],
        'label-md': ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-lg': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg-mobile': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-caps': ['12px', { lineHeight: '1.2', letterSpacing: '0.1em', fontWeight: '500' }],
        'label-md': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
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
