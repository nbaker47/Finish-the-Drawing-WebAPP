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
  // const randomLinesRef = useRef<{ x: number; y: number }[][]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [randomWord, setRandomWord] = useState(words[0]);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [randomLines, setRandomLines] = useState<{ x: number; y: number }[][]>(
    []
  );
  const [userLines, setUserLines] = useState<{ x: number; y: number }[][]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    console.log("!!!!!!! Canvas.tsx: canvasHeight", canvasHeight);
  }, [canvasHeight]);

  useEffect(() => {
    console.log("!!!!!!! Canvas.tsx: canvasWidth", canvasWidth);
  }, [canvasWidth]);

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

  // 612.483×217.467
  // 616×265

  const initializeCanvasWrapper = () => {
    if (containerRef.current && canvasRef && typeof canvasRef !== "function") {
      console.log("Initializing canvas");
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      // set height to state
      // setCanvasHeight(canvasHeight);
      // setCanvasWidth(canvasWidth);
      console.log("initializeCanvasWrapper: canvas height", canvasHeight);
      if (context) {
        // Generate random lines if not already generated
        // if (randomLines.length < 1) {
        // wipe the random lines
        setRandomLines([]);
        for (var i = 0; i < 7; i++) {
          console.log("initializeCanvasWrapper: i", i);
          pushRandomLines(
            i,
            randomLines,
            canvasRef,
            context,
            daily.seed
            // setRandomLines
          );
          console.log(
            "initializeCanvasWrapper: randomLines length",
            randomLines.length
          );
          // }
        }
        console.log("initializeCanvasWrapper: randomLines", randomLines);

        initializeCanvas(
          canvasRef,
          randomLines,
          context
          // userLines,
          // setUserLines
        );
        // Draw the lines
        // drawRandomLines(randomLines, canvasRef, context);
      }
    }
  };
  const initializeAndResizeCanvas = () => {
    const container = containerRef.current;
    if (container) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          setCanvasWidth(Math.floor(width - 50));
          setCanvasHeight(Math.floor(height - 50));
        }
        // initializeCanvasWrapper();
      });

      resizeObserver.observe(container);

      console.log("initializeAndResizeCanvas: canvas height", canvasHeight);

      return () => resizeObserver.disconnect();
    }
  };

  //313.719
  //319.672

  useEffect(() => {
    initializeAndResizeCanvas();
    // initializeCanvasWrapper();
    console.log("Canvas.tsx: canvasHeight", canvasHeight);
    // sleep 1 sec
    // setTimeout(() => {
    //   setInitialized(true);
    // }, 1000);
  }, []);

  // useEffect(() => {
  //   initializeAndResizeCanvas();
  //   // initializeCanvasWrapper();
  //   console.log("Canvas.tsx: initialized", initialized);
  // }, [initialized]);

  //
  useEffect(() => {
    initializeCanvasWrapper();
    console.log("Canvas.tsx: canvasHeight", canvasHeight);
  }, [canvasHeight, canvasWidth]);

  // useEffect(() => {
  //   initializeAndResizeCanvas();
  //   window.addEventListener("resize", initializeAndResizeCanvas);

  //   return () => {
  //     window.removeEventListener("resize", initializeAndResizeCanvas);
  //   };
  // }, [canvasRef, daily.seed, containerRef]);

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
        "w-[100%]",
        "xs:w-[85%]",
        "sm:w-[90%]",
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
            "w-[100%]",
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
            "w-[100%]"
            // "h-[100]%"
          )}
        >
          <div className="flex flex-grow">
            <canvas
              className="static fade-in cursor-crosshair ani-fade-in"
              ref={canvasRef as RefObject<HTMLCanvasElement>}
              onClick={() => {
                setClickCount((prevCount) => prevCount + 1);
              }}
              height={canvasHeight}
              width={canvasWidth}
            ></canvas>
          </div>
        </div>
        <div className="w-full">
          {(canvasLoaded && (
            <CanvasButtons
              description={randomWord}
              canvasRef={canvasRef}
              randomLines={randomLines}
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
