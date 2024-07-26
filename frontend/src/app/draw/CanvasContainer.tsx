"use client";
import React, { useRef, useEffect } from "react";
import Canvas from "@/components/drawing/canvas/Canvas";
import { pushRandomLines } from "@/components/drawing/canvas/randomLines";
import { initializeCanvas } from "@/components/drawing/canvas/drawing"; // Import the initializeCanvas function
import { daily } from "@/types/daily";
import { CanvasContext, CanvasContextProvider } from "./CanvasContext";

export default function CanvasContainer({ daily }: { daily: daily }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let randomLines: { x: number; y: number }[][] = [];

  useEffect(() => {
    // Generate random lines
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Add a null check for context
        for (var i = 0; i < 7; i++) {
          //   console.log(i);
          //   console.log(randomLines);
          pushRandomLines(i, randomLines, canvasRef, context, daily.seed);
        }

        // Initialize the canvas with the drawing functions
        initializeCanvas(canvasRef, randomLines, context);
      } else {
        console.log("Failed to get canvas context");
      }
    } else {
      console.log("canvasRef.current is null");
    }
  }, []); // Empty array means this effect runs once after the component is mounted

  return (
    <>
      <CanvasContext.Provider
        value={{
          canvasRef,
          randomLines,
          daily,
          submitUrl: `${process.env.NEXT_PUBLIC_API_URL}/drawing`,
          redirectUrl: "/view-today",
        }}
      >
        <Canvas pencilMan={true} shareBar={true} />
      </CanvasContext.Provider>
    </>
  );
}
