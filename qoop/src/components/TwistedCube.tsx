import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const TwistedCube: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const twistDirection = useRef<number>(1.0);
  const twistAmount = useRef<number>(0.0);

  const createCubeGeometry = (width: number) => {
    return new THREE.BoxGeometry(width, width, width, 32, 32, 32);
  };

  const [cubeGeometry, setCubeGeometry] = useState<THREE.BoxGeometry>(
    createCubeGeometry(window.innerWidth < 1000 ? 0.5 : 1)
  );

  useEffect(() => {
    let renderer: THREE.WebGLRenderer;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let cube: THREE.Mesh;

    const handleResize = () => {
      const newWidth = window.innerWidth < 1000 ? 0.5 : 1;
      setCubeGeometry(createCubeGeometry(newWidth));

      if (mountRef.current && renderer && camera) {
        const newWidth = mountRef.current.clientWidth;
        const newHeight = mountRef.current.clientHeight;
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
      }
    };

    if (mountRef.current) {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      scene = new THREE.Scene();

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = width;
        canvas.height = height;
        const gradient = context.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#ff6600");
        gradient.addColorStop(1, "#00b9e8");
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      }
      const texture = new THREE.CanvasTexture(canvas);
      scene.background = texture;

      camera = new THREE.PerspectiveCamera(33, width / height, 0.1, 1000);
      camera.position.z = 5;
      camera.position.x = 1;
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);
      mountRef.current.appendChild(renderer.domElement);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;

      const material = new THREE.ShaderMaterial({
        uniforms: {
          twistAmount: { value: 2.0 },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float twistAmount;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float angle = twistAmount * pos.y * 2.0;
            float s = sin(angle);
            float c = cos(angle);
            mat2 m = mat2(c, -s, s, c);
            pos.xz = m * pos.xz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          void main() {
            vec3 color1 = vec3(1.0, 0.423, 0.039);
            vec3 color2 = vec3(0.0, 0.654, 0.82);
            vec3 color = mix(color1, color2, vUv.y);
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });

      cube = new THREE.Mesh(cubeGeometry, material);
      scene.add(cube);

      let lastTwistTime = 0;
      const animate = (time: number) => {
        requestAnimationFrame(animate);
        cube.rotation.y += 0.005;
        cube.rotation.x += 0.002;
        if (time - lastTwistTime >= 2000) {
          lastTwistTime = time;
          twistDirection.current *= -1;
        }
        const targetTwistAmount = twistDirection.current;
        twistAmount.current += (targetTwistAmount - twistAmount.current) * 0.01;
        material.uniforms.twistAmount.value = twistAmount.current;

        controls.update();
        renderer.render(scene, camera);
      };
      animate(0);

      window.addEventListener('resize', handleResize);

      const mountNode = mountRef.current;
      return () => {
        if (mountNode) {
          mountNode.removeChild(renderer.domElement);
        }
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [cubeGeometry]);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default TwistedCube;