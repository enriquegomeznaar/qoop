import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import Header from "./components/Header";
import "./App.css"; 

// Create a deformed cube
const DeformedCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() / 2;
      meshRef.current.rotation.y = clock.getElapsedTime() / 2;
    }
  });

  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const positionAttribute = geometry.getAttribute("position");
  const vertex = new THREE.Vector3();

  for (let i = 0; i < positionAttribute.count; i++) {
    vertex.fromBufferAttribute(positionAttribute, i);
    vertex.x += (Math.random() - 0.5) * 0.5;
    vertex.y += (Math.random() - 0.5) * 0.5;
    vertex.z += (Math.random() - 0.5) * 0.5;
    positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  geometry.attributes.position.needsUpdate = true;

  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    envMap: scene.background as THREE.Texture | null,
    reflectivity: 1,
    shininess: 100,
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
};

// Shader to create the gradient background
const Background = () => {
  const { scene } = useThree();

  useEffect(() => {
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      void main() {
        vec2 st = vUv;
        vec3 color = mix(vec3(1.0, 0.5, 0.0), vec3(0.0, 1.0, 1.0), st.x);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const backgroundMesh = new THREE.Mesh(geometry, material);
    backgroundMesh.scale.set(window.innerWidth, window.innerHeight, 1);
    backgroundMesh.position.z = -5; // Ensure the background is behind other objects
    scene.add(backgroundMesh);

    const onResize = () => {
      backgroundMesh.scale.set(window.innerWidth, window.innerHeight, 1);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      scene.remove(backgroundMesh);
      backgroundMesh.geometry.dispose();
      backgroundMesh.material.dispose();
    };
  }, [scene]);

  return null;
};

const Scene = () => {
  const { camera, gl, scene } = useThree();

  useEffect(() => {
    camera.position.z = 5;
    camera.position.x = 0;
    camera.position.y = 0;
  }, [camera]);

  useEffect(() => {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      "path-to-env-map/px.jpg",
      "path-to-env-map/nx.jpg",
      "path-to-env-map/py.jpg",
      "path-to-env-map/ny.jpg",
      "path-to-env-map/pz.jpg",
      "path-to-env-map/nz.jpg",
    ]);
    scene.background = texture;
  }, [scene]);

  return (
    <>
      <ambientLight intensity={1} />
      <DeformedCube />
      <OrbitControls args={[camera, gl.domElement]} />
      <Background />
      <Html fullscreen>
        <Header />
      </Html>
    </>
  );
};

const App = () => {
  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
      <Canvas style={{ height: "100%", width: "100%" }}>
        <Scene />
      </Canvas>
      <h1>hola</h1>
    </div>
  );
};

export default App;
