"use client";

import React, { useRef, useEffect } from "react";
import Canvas from "@/components/drawing/canvas/Canvas";
import {
  pushRandomLines,
  drawRandomLines,
} from "@/components/drawing/canvas/randomLines";

export default function CanvasContainer({ seed }: { seed: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generate random lines
    let randomLines: { x: number; y: number }[][] = [];
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Add a null check for context
        for (var i = 0; i < 7; i++) {
          console.log(i);
          console.log(randomLines);
          pushRandomLines(i, randomLines, canvasRef, context, seed);
        }
        drawRandomLines(randomLines, canvasRef, context);
      } else {
        console.log("Failed to get canvas context");
      }
    } else {
      console.log("canvasRef.current is null");
    }
    // Draw the random lines
  }, []); // Empty array means this effect runs once after the component is mounted

  return (
    <>
      <Canvas pencilMan={true} shareBar={true} ref={canvasRef} />
    </>
  );
}
