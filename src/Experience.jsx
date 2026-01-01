import {
  Float,
  Html,
  MeshReflectorMaterial,
  OrbitControls,
  Text,
  useHelper,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const sphereRef = useRef();
  const cubeRef = useRef();
  const planeRef = useRef();
  const groupRef = useRef();
  const directionalLightRef = useRef();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
  });

  const { perfVisible } = useControls({
    perfVisible: true,
  });

  const { position, color, visible } = useControls("sphere", {
    position: {
      value: { x: -2, y: 0 },
      min: -4,
      max: 4,
      step: 0.01,
      joystick: "invertY",
    },
    color: "#ff0000",
    visible: true,
  });

  const { scale } = useControls("cube", {
    scale: {
      value: 1.5,
      min: 0.5,
      max: 3,
    },
  });

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>
      {perfVisible ? <Perf position="top-left" /> : null}
      <OrbitControls makeDefault />

      <directionalLight
        position={[1, 2, 3]}
        intensity={4.5}
        ref={directionalLightRef}
        castShadow
      />
      <ambientLight intensity={1.5} />

      <group ref={groupRef}>
        <mesh
          position={[position.x, position.y, 0]}
          ref={sphereRef}
          visible={visible}
          castShadow
        >
          <sphereGeometry scale={1.5} />
          <meshStandardMaterial color={color} />
          <Html
            position={[1, 1, 0]}
            wrapperClass="label"
            center
            distanceFactor={6}
            occlude={[cubeRef, sphereRef, planeRef]}
          >
            That's a sphere
          </Html>
        </mesh>

        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          position-x={2}
          scale={scale}
          castShadow
        >
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>

      <mesh
        ref={planeRef}
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={20}
        receiveShadow
      >
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          color="greenYellow"
          side={THREE.DoubleSide}
        />
      </mesh>

      <Float speed={5} floatIntensity={2}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          fontSize={1}
          color="salmon"
          position-y={2}
          maxWidth={2}
          textAlign="center"
        >
          Three.JS Journey
          <meshNormalMaterial side={THREE.DoubleSide} />
        </Text>
      </Float>
    </>
  );
}
