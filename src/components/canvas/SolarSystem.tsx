'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

// Inner component for an individual planet and its orbit ring
function Planet({
  radius,
  distance,
  speed,
  color,
}: {
  radius: number
  distance: number
  speed: number
  color: string
}) {
  const meshRef = useRef<any>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Orbit rotation around the center
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * speed) * distance
      meshRef.current.position.z = Math.cos(state.clock.elapsedTime * speed) * distance
      // Spin on its own axis
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Orbit Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.02, distance + 0.02, 64]} />
        {/* side={2} is equivalent to THREE.DoubleSide */}
        <meshBasicMaterial color="#4C1D95" transparent opacity={0.3} side={2} />
      </mesh>
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      {/* Light emanating from the central sun */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#d3bbff" distance={50} decay={2} />

      {/* Central Sun / Star */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#d3bbff" />
      </mesh>

      {/* Orbiting Planets */}
      {/* Planet 1 (Inner) */}
      <Planet radius={0.3} distance={3.5} speed={0.8} color="#5B8B99" />
      {/* Planet 2 (Middle) */}
      <Planet radius={0.5} distance={5.5} speed={0.5} color="#c5c5d4" />
      {/* Planet 3 (Outer) */}
      <Planet radius={0.4} distance={8.0} speed={0.3} color="#4C1D95" />

      {/* Distant star field */}
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      {/* Mouse & Touch Interaction. autoRotate spins the scene when idle */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.0}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export default function SolarSystem() {
  return (
    <div className="w-full h-[400px] lg:h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
