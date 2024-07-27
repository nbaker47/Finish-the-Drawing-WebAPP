"use client";

import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  RefObject,
  useContext,
  use,
} from "react";
import clsx from "clsx";
import CanvasButtons from "@/components/drawing/canvas/CanvasButtons";
import Sharebar from "@/components/Sharebar";
import PencilMan from "@/components/drawing/pencil/PencilMan";
import {
  drawRandomLines,
  initializeCanvas,
} from "@/components/drawing/canvas/drawing";
import words from "@/components/drawing/pencil/words";
import { CanvasContext } from "@/app/draw/CanvasContext";
import { pushRandomLines } from "./randomLines";
import { time } from "console";

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
  const { daily, canvasRef } = useContext(CanvasContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const randomLinesRef = useRef<{ x: number; y: number }[][]>([]);
  const [clickCount, setClickCount] = useState(0);

  console.log("Canvas.tsx: canvasRef", canvasRef);

  useEffect(() => {
    const initializeAndResizeCanvas = () => {
      if (
        containerRef.current &&
        canvasRef &&
        typeof canvasRef !== "function"
      ) {
        console.log("Initializing canvas");

        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const { width, height } = container.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");
        if (context) {
          // Generate random lines if not already generated
          if (randomLinesRef.current.length === 0) {
            for (var i = 0; i < 7; i++) {
              pushRandomLines(
                i,
                randomLinesRef.current,
                canvasRef,
                context,
                daily.seed
              );
            }
          }
          // add event listeners
          initializeCanvas(canvasRef, randomLinesRef.current, context);
          // Draw the lines
          drawRandomLines(randomLinesRef.current, canvasRef, context);
        }
      }
    };

    initializeAndResizeCanvas();
    window.addEventListener("resize", initializeAndResizeCanvas);

    return () => {
      window.removeEventListener("resize", initializeAndResizeCanvas);
    };
  }, [canvasRef, daily.seed]);

  // TODO: HACK, when the window is resized, refresh the window
  // const refresh = () => {
  //   window.location.reload();
  // };
  // window.addEventListener("resize", refresh);

  // State for pencil text
  const [randomWord, setRandomWord] = useState(words[0]);

  return (
    <div
      className={clsx(
        // "flex",
        // "flex-col",
        "bg-pokadot",
        "border-[1.1px]",
        "border-gray-700",
        "rounded-3xl",
        "px-2",
        "pt-3",
        "pb-2",
        // "w-full",
        // "h-full",

        // "h-[77%]",
        // "w-full",
        // "h-full",
        // "h-min-c",
        // "flex-grow",
        // "max-w-[90%]",
        // "min-h-[400px]",
        "mx-auto",
        // "h-fit",
        className
      )}
      style={{ boxShadow: "3px 3px 3px 2px rgba(0, 0, 0, 0.23)" }}
    >
      {shareBar && <Sharebar className="mb-3" />}

      <div
        className={clsx(
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          // "aspect-[1/1]",
          "w-[100%]",
          "h-[100%]",
          "max-w-[99vw]",
          // "max-w-[90%]",
          "min-h-[55vh]",
          // "min-w-[150px]",
          "mx-auto"
          // "screen-height-grow"
        )}
      >
        {pencilMan && (
          <div className="max-w-[95%]">
            <PencilMan
              className="mb-3 w-full"
              clickCount={clickCount}
              randomWord={randomWord}
              setRandomWord={setRandomWord}
            />
          </div>
        )}
        <div
          ref={containerRef}
          className={clsx(
            "bg-white",
            // "ftd-border",
            "rounded-3xl",
            "flex-grow",
            "border-dashed",
            "border-gray-700",
            "border-2",
            // "w-full",
            "w-[95%]"

            // "md:w-[60%]"
          )}
          onClick={() => {
            setClickCount((count) => count + 1);
          }}
        >
          <div className="flex-grow w-[100%] min-h-[200px]">
            <canvas
              className="static fade-in cursor-crosshair w-full h-full  ani-fade-in"
              ref={canvasRef as RefObject<HTMLCanvasElement>}
            ></canvas>
          </div>
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
