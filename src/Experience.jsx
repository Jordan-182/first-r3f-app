import {
  ContactShadows,
  Environment,
  Float,
  Html,
  MeshReflectorMaterial,
  OrbitControls,
  Text,
  useHelper,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const sphereRef = useRef();
  const cubeRef = useRef();
  const planeRef = useRef();
  const groupRef = useRef();
  const directionalLightRef = useRef();

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cubeRef.current.position.x = 2 + Math.sin(time);
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

  const { shadowColor, opacity, blur } = useControls("contact shadows", {
    shadowColor: "#1d8f75",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity } = useControls("environment map", {
    envMapIntensity: { value: 3.5, min: 0, max: 12 },
  });

  const scene = useThree((state) => state.scene);
  useEffect(() => {
    scene.environmentIntensity = envMapIntensity;
  }, [envMapIntensity]);

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>
      <Environment
        background
        files={[
          "./environmentMaps/2/px.jpg",
          "./environmentMaps/2/nx.jpg",
          "./environmentMaps/2/py.jpg",
          "./environmentMaps/2/ny.jpg",
          "./environmentMaps/2/pz.jpg",
          "./environmentMaps/2/nz.jpg",
        ]}
      />
      {perfVisible ? <Perf position="top-left" /> : null}
      <OrbitControls makeDefault />

      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={20}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={3}
          bias={0.001}
        />
      </AccumulativeShadows>*/}

      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={shadowColor}
        opacity={opacity}
        blur={blur}
      />

      {/*<directionalLight
        position={sunPosition}
        intensity={4.5}
        ref={directionalLightRef}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
        shadow-camera-near={1}
        shadow-camera-far={10}
      />
      <ambientLight intensity={1.5} />
      <Sky sunPosition={sunPosition} />*/}

      <group ref={groupRef}>
        <mesh
          position={[position.x, position.y, 0]}
          ref={sphereRef}
          visible={visible}
          castShadow
        >
          <sphereGeometry scale={1.5} />
          <meshStandardMaterial
            color={color}
            envMapIntensity={envMapIntensity}
          />
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
          <meshStandardMaterial
            color="mediumpurple"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
      </group>

      <mesh
        ref={planeRef}
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={20}
      >
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          color="greenYellow"
          side={THREE.DoubleSide}
          envMapIntensity={envMapIntensity}
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
          <meshNormalMaterial
            side={THREE.DoubleSide}
            envMapIntensity={envMapIntensity}
          />
        </Text>
      </Float>
    </>
  );
}
