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
  const refresh = () => {
    window.location.reload();
  };
  window.addEventListener("resize", refresh);

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
            // style={{ width: "200px", height: "200px" }}
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
