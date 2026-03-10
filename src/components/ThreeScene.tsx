import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Box, Icosahedron } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Rotasi yang lebih dinamis
      meshRef.current.rotation.x = Math.cos(t / 4) * 0.2;
      meshRef.current.rotation.y = Math.sin(t / 4) * 0.3;
      // Efek bernafas pada skala (pulsing)
      meshRef.current.scale.setScalar(1 + Math.sin(t) * 0.05);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#14b8a6"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function FloatingShape({ Component, args, position, color, speedOffset }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + speedOffset;
    if (meshRef.current) {
      // Pergerakan sinusoidal untuk posisi (biar lebih "floating")
      meshRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.2;
      meshRef.current.position.x = position[0] + Math.cos(t * 0.5) * 0.1;
      
      // Rotasi halus
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <Component ref={meshRef} args={args} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.8}
        />
      </Component>
    </Float>
  );
}

function ParticleField() {
  const count = 120; // Menambah sedikit partikel
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      // Orbit pelan untuk seluruh field partikel
      pointsRef.current.rotation.y = t * 0.03;
      pointsRef.current.rotation.z = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#14b8a6" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-black/20">
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#14b8a6" />
        
        {/* Objek Utama */}
        <AnimatedSphere />
        
        {/* Objek Pendukung dengan Gerakan Sinusoidal Berbeda-beda */}
        <FloatingShape 
          Component={Torus} 
          args={[0.6, 0.15, 32, 64]} 
          position={[3, 1.5, -1]} 
          color="#0ea5e9" 
          speedOffset={0} 
        />
        <FloatingShape 
          Component={Box} 
          args={[0.5, 0.5, 0.5]} 
          position={[-3, -1, -1]} 
          color="#8b5cf6" 
          speedOffset={2} 
        />
        <FloatingShape 
          Component={Icosahedron} 
          args={[0.4, 0]} 
          position={[-2, 2, 0]} 
          color="#f97316" 
          speedOffset={4} 
        />
        
        <ParticleField />
      </Canvas>
    </div>
  );
}