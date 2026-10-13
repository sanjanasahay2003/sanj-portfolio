
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const pointsRef = useRef(null);
  const { positions, colors } = useMemo(() => {
    const count = 450;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

      color.set(i % 5 === 0 ? "#00ddf5" : "#8aa9c8");

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const targetX = state.pointer.y * 0.12;
    const targetY = state.pointer.x * 0.16;

    pointsRef.current.rotation.x = THREE.MathUtils.damp(
      pointsRef.current.rotation.x,
      targetX,
      2,
      delta
    );

    pointsRef.current.rotation.y = THREE.MathUtils.damp(
      pointsRef.current.rotation.y,
      targetY + state.clock.elapsedTime * 0.025,
      2,
      delta
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingShape() {
  const shapeRef = useRef(null);

  useFrame((state, delta) => {
    if (!shapeRef.current) return;

    shapeRef.current.rotation.x = THREE.MathUtils.damp(
      shapeRef.current.rotation.x,
      state.pointer.y * 0.18,
      2,
      delta
    );

    shapeRef.current.rotation.y = THREE.MathUtils.damp(
      shapeRef.current.rotation.y,
      state.pointer.x * 0.22,
      2,
      delta
    );
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.2}>
      <mesh ref={shapeRef} position={[1.35, 0, -0.2]}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial
          color="#00ddf5"
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
    </Float>
  );
}

export default function ParticleScene() {
  return (
    <div className="particle-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 48 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        fallback={<div className="particle-fallback" />}
      >
        <ParticleField />
        <FloatingShape />
      </Canvas>
    </div>
  );
}
