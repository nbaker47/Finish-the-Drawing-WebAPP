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
import { daily } from "@/types/daily";

interface CanvasProps {
  className?: string;
  pencilMan?: boolean;
  shareBar?: boolean;
  // canvasRef: RefObject<HTMLCanvasElement>;
  // randomLines?: { x: number; y: number }[][];
  lines: boolean;
  daily: daily;
  submitUrl: string;
  redirectUrl: string;
}

export default function Canvas({
  className,
  pencilMan,
  shareBar,
  // canvasRef,
  // randomLines,
  lines,
  daily,
  submitUrl,
  redirectUrl,
}: CanvasProps) {
  // const { daily, canvasRef } = useContext(CanvasContext);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const [containerLoaded, setContainerLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const randomLinesRef = useRef<{ x: number; y: number }[][]>([]);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    setCanvasLoaded(true);
  }, [canvasRef]);

  useEffect(() => {
    setContainerLoaded(true);
    containerRef.current?.addEventListener("click", () => {
      setClickCount((prevCount) => prevCount + 1);
      console.log("Canvas.tsx: clickCount", clickCount);
    });
    containerRef.current?.addEventListener("touchstart", () => {
      setClickCount((prevCount) => prevCount + 1);
      console.log("Canvas.tsx: clickCount", clickCount);
    });
  }, [containerRef]);

  useEffect(() => {
    console.log("Canvas.tsx: canvasRef", canvasRef);
  }, [canvasRef]);

  useEffect(() => {
    console.log("Canvas.tsx: clickCount", clickCount);
  }, [clickCount]);

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
        canvas.height = height - 40;

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
          if (lines) {
            let randomLines: { x: number; y: number }[][] = [];
            for (var i = 0; i < 7; i++) {
              //   console.log(i);
              //   console.log(randomLines);
              pushRandomLines(i, randomLines, canvasRef, context, daily.seed);
            }
            drawRandomLines(randomLinesRef.current, canvasRef, context);
          }
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
        "flex",
        "flex-col",
        "flex-grow",
        "items-center",
        "justify-center",
        "bg-pokadot",
        "border-[1.1px]",
        "border-gray-700",
        "rounded-3xl",
        "px-2",
        "pt-3",
        "pb-2",
        "sm:max-w-[90%]",
        // "items-center",
        // "justify-center",
        "mx-auto",
        className
      )}
      style={{ boxShadow: "3px 3px 3px 2px rgba(0, 0, 0, 0.23)" }}
    >
      {shareBar && <Sharebar className="mb-3" />}
      <div
        className={
          clsx(
            "flex",
            "flex-col",
            "flex-grow",
            "items-center",
            "justify-center",
            "max-w-[98vw]",
            "sm:max-w-[90%]"
          )
          // // "aspect-[1/1]",
          // "w-[100%]",
          // "h-[100%]",
          // "max-w-[99vw]",
          // // "max-w-[90%]",
          // "min-h-[55vh]",
          // // "min-w-[150px]",
          // "mx-auto"
          // // "screen-height-grow"
        }
      >
        {pencilMan && (
          <div className="w-11/12">
            <PencilMan
              className="mb-3 w-full"
              clickCount={clickCount}
              randomWord={randomWord}
              setRandomWord={setRandomWord}
              canvasLoaded={canvasLoaded}
            />
          </div>
        )}
        <div
          ref={containerRef}
          className={clsx(
            "bg-white",
            "rounded-3xl",
            "flex",
            "flex-grow",
            "border-dashed",
            "border-gray-700",
            "border-2",
            "w-[95%]"
          )}
        >
          <div className="flex flex-grow">
            <canvas
              className="static fade-in cursor-crosshair w-full h-full  ani-fade-in"
              ref={canvasRef as RefObject<HTMLCanvasElement>}
              onClick={() => {
                setClickCount((prevCount) => prevCount + 1);
              }}
            ></canvas>
          </div>
        </div>
        <div className="w-full">
          {(canvasLoaded && (
            <CanvasButtons
              description={randomWord}
              canvasRef={canvasRef}
              randomLines={randomLinesRef.current}
              daily={daily}
              submitUrl={submitUrl}
              redirectUrl={redirectUrl}
            />
          )) ?? <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}
