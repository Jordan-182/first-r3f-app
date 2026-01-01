import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Experience from "./Experience";
import "./style.css";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    <Leva collapsed />
    <Canvas
      camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 6] }}
      dpr={[1, 2]}
      shadows={false}
    >
      <Experience />
    </Canvas>
  </StrictMode>
);
