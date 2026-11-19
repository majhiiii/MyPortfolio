"use client";

import dynamic from "next/dynamic";

const SceneCanvas = dynamic(
  () => import("./SceneCanvas").then((mod) => mod.SceneCanvas),
  { ssr: false }
);

export function CanvasContainer() {
  return <SceneCanvas />;
}
