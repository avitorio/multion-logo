import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useControls } from "leva";

import React, { useRef, useState } from "react";
import * as THREE from "three";

function SpinningRing() {
  const meshRef = useRef();
  const mesh2Ref = useRef();
  const { scene, gl } = useThree();
  const [envMap, setEnvMap] = useState();

  // Gradient texture
  const gradientTexture = useLoader(
    THREE.TextureLoader,
    "/multion-gradient-2.png"
  );

  const {
    torusLength,
    torusThickness,
    rotationSpeed,
    rotationSpeed2,
    metalness,
    roughness,
  } = useControls({
    rotationSpeed: { value: 0.008, min: 0, max: 0.1, step: 0.001 },
    rotationSpeed2: { value: 0.005, min: 0, max: 0.1, step: 0.001 },
    metalness: { value: 0.12, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    torusThickness: { value: 0.15, min: 0, max: 1, step: 0.01 },
    torusLength: { value: 16, min: 0, max: 100, step: 1 },
  });

  useFrame(() => {
    meshRef.current.rotation.x += rotationSpeed;
    meshRef.current.rotation.y += rotationSpeed;

    mesh2Ref.current.rotation.x += rotationSpeed2;
    mesh2Ref.current.rotation.y += rotationSpeed2;
  });

  return (
    <>
      <mesh ref={meshRef} rotation={[180, 0, 0]} scale={[1.5, 1, 1]}>
        {/* Adjusting TorusGeometry to look more like a cylindrical ring */}
        <torusGeometry args={[1, torusThickness, torusLength, 100]} />
        <meshStandardMaterial
          envMap={envMap}
          map={gradientTexture}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh ref={mesh2Ref} rotation={[0, 0, 0]} scale={[1.5, 1, 1]}>
        {/* Adjusting TorusGeometry to look more like a cylindrical ring */}
        <torusGeometry args={[1, torusThickness, 16, 100]} />
        <meshStandardMaterial
          envMap={envMap}
          map={gradientTexture}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
    </>
  );
}

function App() {
  return (
    <Canvas shadows>
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={4.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <OrbitControls />
      <SpinningRing />
    </Canvas>
  );
}

export default App;
