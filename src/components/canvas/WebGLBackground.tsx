'use client'

import { useEffect, useRef } from 'react'

const VERTEX_SHADER_SOURCE = `
  attribute vec2 position;
  varying vec2 v_texCoord;
  void main() {
    v_texCoord = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER_SOURCE = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  varying vec2 v_texCoord;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    vec2 mouse = (u_mouse.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    // Gravitational Warp Effect
    float distToMouse = length(uv - mouse);
    float warp = exp(-distToMouse * 5.0) * 0.15;
    vec2 warpedUV = uv + normalize(mouse - uv) * warp;

    vec3 color = vec3(0.005, 0.008, 0.015); // Deep cosmic void

    // Multi-layered starfield
    for(float i = 1.0; i <= 4.0; i++) {
      float size = 150.0 * i;
      vec2 grid_uv = warpedUV * size;
      vec2 id = floor(grid_uv);
      vec2 g_uv = fract(grid_uv) - 0.5;

      float h = hash(id);
      if(h > 0.985) {
        float r = length(g_uv);
        float star = 0.008 / r;

        // Twinkle and distance fading
        star *= (0.6 + 0.4 * sin(u_time * (1.5 + h) + h * 10.0));

        // Slightly brighter color temperature variation
vec3 starColor = vec3(1.0, 1.05, 1.15); // Bright blue-white
if(h > 0.996) starColor = vec3(1.15, 0.95, 0.85); // Warm orange-white

        color += star * starColor * (0.3 + 0.7 * h);
      }
    }

    // Atmospheric nebula glow
    color += vec3(0.02, 0.0, 0.05) * length(uv);

    gl_FragColor = vec4(color, 1.0);
  }
`

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function WebGLBackground(): null {
  const animFrameRef = useRef<number>(0)
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    // Create and insert canvas into document
    const canvas = document.createElement('canvas')
    canvas.id = 'webgl-bg-canvas'
    canvas.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: -10;
      pointer-events: none;
    `
    document.body.prepend(canvas)

    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    // Full-screen quad
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )

    const positionLocation = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const timeLoc = gl.getUniformLocation(program, 'u_time')
    const resLoc = gl.getUniformLocation(program, 'u_resolution')
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse')

    const handleMouseMove = (e: MouseEvent): void => {
      mouseRef.current = { x: e.clientX, y: window.innerHeight - e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const render = (time: number): void => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(timeLoc, time * 0.001)
      gl.uniform2f(resLoc, canvas.width, canvas.height)
      gl.uniform2f(mouseLoc, mouseRef.current.x, mouseRef.current.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animFrameRef.current = requestAnimationFrame(render)
    }
    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animFrameRef.current)
      canvas.remove()
    }
  }, [])

  return null
}
