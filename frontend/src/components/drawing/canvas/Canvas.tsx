"use client";

import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  RefObject,
  useContext,
} from "react";
import clsx from "clsx";
import CanvasButtons from "@/components/drawing/canvas/CanvasButtons";
import Sharebar from "@/components/Sharebar";
import PencilMan from "@/components/drawing/pencil/PencilMan";
import { drawRandomLines } from "@/components/drawing/canvas/drawing";
import words from "@/components/drawing/pencil/words";
import { CanvasContext } from "@/app/draw/CanvasContext";

interface CanvasProps {
  className?: string;
  pencilMan?: boolean;
  shareBar?: boolean;
}

export default function Canvas({
  className,
  pencilMan,
  shareBar,
}: CanvasProps) {
  // Retrieve context from CanvasContext
  const { randomLines, canvasRef } = useContext(CanvasContext);

  // State for canvas drawing
  const containerRef = useRef<HTMLDivElement>(null);
  const [clickCount, setClickCount] = useState(0); // New state variable

  useEffect(() => {
    const resizeCanvas = () => {
      if (
        containerRef.current &&
        canvasRef &&
        typeof canvasRef !== "function"
      ) {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        const { width, height } = container.getBoundingClientRect();

        if (!canvas) {
          return;
        }

        // Set canvas dimensions to match container size
        canvas.width = width;
        canvas.height = height;

        // Redraw your canvas content here if needed
        const context = canvas.getContext("2d");
        if (context && randomLines) {
          drawRandomLines(randomLines, { current: canvas }, context);
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [canvasRef, randomLines]); // Ensure `randomLines` is also a dependency

  // State for pencil text
  const [randomWord, setRandomWord] = useState(words[0]);

  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "bg-pokadot",
        "border-[1.1px]",
        "border-gray-700",
        "rounded-3xl",
        "px-2",
        "pt-3",
        "pb-2",
        "w-full",
        "h-fit",
        className
      )}
      style={{ boxShadow: "3px 3px 3px 2px rgba(0, 0, 0, 0.23)" }}
      id="main-drawing-interface"
    >
      {shareBar && <Sharebar className="mb-3" />}

      <div
        className={clsx(
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "aspect-[1/1]",
          "w-full",
          "h-full",
          "mx-auto",
          "screen-height-grow"
        )}
      >
        {pencilMan && (
          <PencilMan
            className="mb-3 screen-height-grow w-full"
            clickCount={clickCount}
            randomWord={randomWord}
            setRandomWord={setRandomWord}
          />
        )}
        <div
          ref={containerRef}
          className={clsx(
            "bg-white",
            // "ftd-border",
            "rounded-3xl",
            "w-full",
            "h-full",
            "border-dashed",
            "border-gray-700",
            "border-2"
          )}
          onClick={() => {
            setClickCount((count) => count + 1);
          }}
        >
          <canvas
            id="drawing-canvas"
            className="static fade-in cursor-crosshair w-full h-full"
            ref={canvasRef as RefObject<HTMLCanvasElement>}
          ></canvas>
        </div>
        <div className="w-full">
          {(canvasRef && "current" in canvasRef && canvasRef.current && (
            <CanvasButtons description={randomWord} />
          )) ?? <CanvasButtons />}
        </div>
      </div>
    </div>
  );
}
