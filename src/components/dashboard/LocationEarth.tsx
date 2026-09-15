"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Line } from "@react-three/drei"
import * as THREE from "three"
import { MapPin } from "lucide-react"

function Globe() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  // Approximate Pakistan coordinates mapped to a sphere
  // Latitude: 30, Longitude: 70
  const lat = 30 * (Math.PI / 180)
  const lon = -70 * (Math.PI / 180)
  const radius = 2
  
  const x = radius * Math.cos(lat) * Math.cos(lon)
  const y = radius * Math.sin(lat)
  const z = radius * Math.cos(lat) * Math.sin(lon)

  return (
    <group ref={groupRef} rotation={[0.5, 0, 0]}>
      {/* Base Globe */}
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial color="#0f172a" transparent opacity={0.8} />
      </Sphere>
      
      {/* Wireframe/Grid overlay */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.15} />
      </Sphere>

      {/* Pakistan Marker */}
      <group position={[x, y, z]}>
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
        {/* Glow */}
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
        </mesh>
      </group>
      
      {/* Simple Airplane Route (Curve) */}
      <AirplaneRoute />
    </group>
  )
}

function AirplaneRoute() {
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-2.2, 0, 0),
    new THREE.Vector3(0, 3, 0),
    new THREE.Vector3(2.2, 0, 0)
  )
  const points = curve.getPoints(50)
  const planeRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (planeRef.current) {
      const time = state.clock.getElapsedTime()
      const t = (Math.sin(time * 0.5) + 1) / 2 // Loop between 0 and 1
      const position = curve.getPointAt(t)
      planeRef.current.position.copy(position)
      // Look at next point for rotation
      if (t < 0.99) {
        const nextPosition = curve.getPointAt(t + 0.01)
        planeRef.current.lookAt(nextPosition)
      }
    }
  })

  return (
    <group>
      <Line points={points} color="#3b82f6" opacity={0.2} transparent dashed />
      <mesh ref={planeRef}>
        <coneGeometry args={[0.04, 0.15, 8]} />
        <meshBasicMaterial color="#ffffff" />
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.2, 0.02, 0.05]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </mesh>
    </group>
  )
}

export function LocationEarth() {
  return (
    <div className="bento-card col-span-1 md:col-span-2 row-span-2 h-[320px] md:h-[400px] flex flex-col relative group">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-border">
        <MapPin size={14} className="text-muted-foreground" />
        <span className="text-xs font-medium">Pakistan</span>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-0 pointer-events-none" />
      
      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <Globe />
        </Canvas>
      </div>
    </div>
  )
}
