"use client";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import CanvasButtons from "@/components/drawing/canvas/CanvasButtons";
import Sharebar from "@/components/Sharebar";
import PencilMan from "@/components/drawing/pencil/PencilMan";
import { drawRandomLines } from "@/components/drawing/canvas/drawing";

interface CanvasProps {
  className?: string;
  pencilMan?: boolean;
  shareBar?: boolean;
  randomLines?: { x: number; y: number }[][];
}

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  ({ className, pencilMan, shareBar, randomLines }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [clickCount, setClickCount] = useState(0); // New state variable

    useEffect(() => {
      const resizeCanvas = () => {
        if (ref && "current" in ref && ref.current && containerRef.current) {
          const container = containerRef.current;
          const canvas = ref.current;
          const { width, height } = container.getBoundingClientRect();

          // Set canvas dimensions to match container size
          canvas.width = width;
          canvas.height = height;

          // // Redraw your canvas content here if needed
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
    }, [ref]);

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
          // `${pencilMan && "mt-5 sm:mt-0"}`
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
            // "w-[90%]",
            // "h-[90%]",
            "mx-auto",
            "screen-height-grow"
          )}
        >
          {pencilMan && (
            <PencilMan
              className="mb-3 screen-height-grow w-full"
              clickCount={clickCount}
            />
          )}
          <div
            ref={containerRef}
            className={clsx(
              "bg-white",
              "ftd-border",
              "rounded-3xl",
              "w-full",
              "h-full"
            )}
            onClick={() => {
              setClickCount((count) => {
                const newCount = count + 1;
                return newCount;
              });
            }}
          >
            <canvas
              id="drawing-canvas"
              className="static fade-in cursor-crosshair w-full h-full"
              ref={ref}
            ></canvas>
          </div>
          <div className="w-full">
            <CanvasButtons className="your-optional-classes" />
          </div>
        </div>
      </div>
    );
  }
);

Canvas.displayName = "Canvas"; // Add a display name
export default Canvas;
