"use client";

import { useEffect, useRef } from "react";

export default function ShaderBackground({
  animationSpeed = 0.05,
  backgroundColor = "#000000",
  colorIntensity = 1,
  mosaicScale = { x: 4, y: 2 },
  colorA = "#ff3d2d",
  colorB = "#ffffff",
  width = "100%",
  height = "100%",
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef({
    camera: null,
    scene: null,
    renderer: null,
    uniforms: null,
    animationId: null,
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js";
    script.onload = () => {
      if (containerRef.current && window.THREE) {
        initThreeJS();
      }
    };
    document.head.appendChild(script);

    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }
      const existingScript = document.querySelector(
        'script[src="https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js"]'
      );
      if (existingScript && existingScript !== script) {
        document.head.removeChild(existingScript);
      }
    };
  }, [animationSpeed, mosaicScale, colorIntensity, colorA, colorB, backgroundColor]);

  const initThreeJS = () => {
    if (!containerRef.current || !window.THREE) return;

    const THREE = window.THREE;
    const container = containerRef.current;
    container.innerHTML = "";

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    const uniforms = {
      time: { type: "f", value: 1 },
      resolution: { type: "v2", value: new THREE.Vector2() },
      mosaicScale: {
        type: "v2",
        value: new THREE.Vector2(mosaicScale.x, mosaicScale.y),
      },
      colorIntensity: { type: "f", value: colorIntensity },
      colorA: { type: "v3", value: new THREE.Color(colorA) },
      colorB: { type: "v3", value: new THREE.Color(colorB) },
      bgColor: { type: "v3", value: new THREE.Color(backgroundColor) },
    };

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      #define PI 3.14159265359
      precision highp float;

      uniform vec2 resolution;
      uniform float time;
      uniform vec2 mosaicScale;
      uniform float colorIntensity;
      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform vec3 bgColor;

      float random(in float x) {
        return fract(sin(x) * 1e4);
      }

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        vec2 fMosaicScale = mosaicScale;
        vec2 vScreenSize = vec2(256.0, 256.0);
        
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScale.x) / (vScreenSize.x / fMosaicScale.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScale.y) / (vScreenSize.y / fMosaicScale.y);
        
        float t = time * 0.06 + random(uv.x) * 0.4;
        float lineWidth = 0.0008;
        
        float intensity = 0.0;
        for(int j = 0; j < 3; j++) {
          for(int i = 0; i < 5; i++) {
            intensity += lineWidth * float(i*i) / abs(fract(t - 0.01*float(j) + float(i)*0.01) - length(uv));
          }
        }
        
        vec3 lineColor = colorA;
        vec3 finalColor = bgColor + intensity * lineColor * colorIntensity;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0, 0);
    container.appendChild(renderer.domElement);

    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: null,
    };

    const onWindowResize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };

    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate);
      uniforms.time.value += animationSpeed;
      renderer.render(scene, camera);
    };

    animate();
  };

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        position: "relative",
      }}
    />
  );
}
