"use client";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, GradientTexture } from "@react-three/drei";
import { useRef, memo } from "react";

const REMOTE_URL = "https://framerusercontent.com/modules/d7gsl1IlPlZYMLbnzNxX/CDHQHDKHLxGzzYCCakBW/DepthGlobe_prod.js";

function LocalGlobe({ glow = 0.6, depth = 0.35, scale = 1.2, speed = 0.3, orbit = false }) {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * speed;
      meshRef.current.rotation.x = 0.25;
    }
  });

  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 45 }}
      shadows
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#000"]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 3, 2]} intensity={1.2} castShadow />
      <directionalLight position={[-3, -1, -2]} intensity={0.4} />
      <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
        <icosahedronGeometry args={[1, 3]} />
        <meshPhysicalMaterial
          metalness={0.1}
          roughness={0.15}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
          transmission={depth}
          ior={1.2}
          thickness={0.4}
          emissiveIntensity={glow}
        >
          <GradientTexture
            stops={[0, 0.35, 0.7, 1]}
            colors={["#0b1021", "#1f2e63", "#e62b1e", "#f6e7d8"]}
            size={1024}
          />
        </meshPhysicalMaterial>
      </mesh>
      {orbit && <OrbitControls enablePan={false} enableZoom={false} />}
    </Canvas>
  );
}

const DepthGlobe = dynamic(
  async () => {
    try {
      const mod = await import(/* webpackIgnore: true */ REMOTE_URL);
      return mod?.default ? mod : { default: LocalGlobe };
    } catch (e) {
      return { default: LocalGlobe };
    }
  },
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full grid place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 animate-pulse" />
    ),
  }
);

function DepthGlobeWrapper(props) {
  return <DepthGlobe {...props} />;
}

export default memo(DepthGlobeWrapper);
