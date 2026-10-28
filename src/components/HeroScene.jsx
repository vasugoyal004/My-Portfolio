import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

function ParticleField({ count = 800, isCream }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const accent = isCream ? new THREE.Color('#15803D') : new THREE.Color('#C6FF3D');
    const primary = isCream ? new THREE.Color('#334155') : new THREE.Color('#FFFFFF');
    const dim = isCream ? new THREE.Color('#94A3B8') : new THREE.Color('#3A3A3A');

    for (let i = 0; i < count; i++) {
      // 3D toroidal galaxy distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 4.5 + 0.8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const rand = Math.random();
      const chosen = rand > 0.75 ? accent : rand > 0.4 ? primary : dim;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return [pos, col];
  }, [count, isCream]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.15;

    // Fluid mouse parallax
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.04;
    pointsRef.current.rotation.x += (-targetY - pointsRef.current.rotation.x) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isCream ? 0.036 : 0.032}
        vertexColors
        transparent
        opacity={isCream ? 0.65 : 0.85}
        blending={isCream ? THREE.NormalBlending : THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CyberGeometry({ isCream }) {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.14;
      meshRef.current.rotation.y = time * 0.18;

      // Mouse displacement
      const targetX = state.pointer.x * 0.45;
      const targetY = state.pointer.y * 0.35;
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.2;
      innerRef.current.rotation.z = time * 0.15;
    }
  });

  return (
    <group position={[1.8, 0.2, 0]}>
      {/* Outer Holographic Torus Wireframe */}
      <mesh ref={meshRef}>
        <torusGeometry args={[1.5, 0.35, 16, 48]} />
        <meshBasicMaterial
          wireframe
          color={isCream ? "#15803D" : "#C6FF3D"}
          transparent
          opacity={isCream ? 0.22 : 0.16}
        />
      </mesh>

      {/* Inner Rotating Core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial
          wireframe
          color={isCream ? "#0F172A" : "#FFFFFF"}
          transparent
          opacity={isCream ? 0.18 : 0.12}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const { isCream } = useTheme();

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={isCream ? 0.7 : 0.4} />
        <pointLight
          position={[3, 3, 3]}
          color={isCream ? "#15803D" : "#C6FF3D"}
          intensity={isCream ? 1.0 : 1.5}
        />
        <ParticleField count={850} isCream={isCream} />
        <CyberGeometry isCream={isCream} />
      </Canvas>
    </div>
  );
}
