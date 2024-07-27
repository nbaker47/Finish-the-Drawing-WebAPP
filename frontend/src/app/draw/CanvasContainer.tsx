"use client";
import React, { useRef, useEffect } from "react";
import Canvas from "@/components/drawing/canvas/Canvas";
import { pushRandomLines } from "@/components/drawing/canvas/randomLines";
import { initializeCanvas } from "@/components/drawing/canvas/drawing"; // Import the initializeCanvas function
import { daily } from "@/types/daily";
import { CanvasContext, CanvasContextProvider } from "./CanvasContext";

export default function CanvasContainer({ daily }: { daily: daily }) {
  return (
    <>
      {/* <CanvasContext.Provider
        value={{

        }}
      > */}
      <Canvas
        pencilMan={true}
        shareBar={true}
        // canvasRef={canvasRef}
        // randomLines={randomLines}
        daily={daily}
        submitUrl={`${process.env.NEXT_PUBLIC_API_URL}/drawing`}
        redirectUrl="/view-today"
      />
      {/* </CanvasContext.Provider> */}
    </>
  );
}
