"use client";

import React, { useEffect, useRef, useState, RefObject } from "react";
import clsx from "clsx";
import CanvasButtons from "@/components/drawing/canvas/CanvasButtons";
import Sharebar from "@/components/Sharebar";
import PencilMan from "@/components/drawing/pencil/PencilMan";
import words from "@/components/drawing/pencil/words";
import { daily } from "@/types/daily";

async function fetchRandomLines(
  containerWidth: number,
  containerHeight: number
) {
  try {
    let url =
      process.env.NEXT_PUBLIC_API_URL +
      "/daily/random-lines?canvas-width=" +
      containerWidth +
      "&canvas-height=" +
      containerHeight;
    console.log("Fetching daily data from:", url);
    let response = await fetch(url, { cache: "no-store" });
    var data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching daily data:", error);
    // Provide fallback data
    return { date: "fallback", id: "fallback", word: "fallback", seed: 511 };
  }
}

export function drawLines(
  context: CanvasRenderingContext2D,
  lines: { x: number; y: number }[][],
  lineWidth: number = 3,
  lineCap: CanvasLineCap = "round",
  strokeStyle: string = "#8F95FF"
) {
  context.lineWidth = lineWidth;
  context.lineCap = lineCap;
  context.strokeStyle = strokeStyle;

  lines.forEach((line) => {
    context.beginPath();
    context.moveTo(line[0].x, line[0].y);

    if (line.length > 1) {
      for (let i = 1; i < line.length; i++) {
        context.lineTo(line[i].x, line[i].y);
      }
    } else {
      // If it's a single point, draw a small circle
      context.arc(line[0].x, line[0].y, lineWidth / 2, 0, 2 * Math.PI);
    }

    context.stroke();
  });
}

export function undo(
  canvasRef: RefObject<HTMLCanvasElement>,
  userDrawnLinesRef: React.MutableRefObject<{ x: number; y: number }[][]>,
  setUserDrawnLines: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }[][]>
  >,
  randomLinesRef: React.MutableRefObject<{ x: number; y: number }[][]>
) {
  if (canvasRef.current && randomLinesRef.current) {
    // Clear the canvas
    let context = canvasRef.current.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    setUserDrawnLines(
      userDrawnLinesRef.current.slice(0, userDrawnLinesRef.current.length - 1)
    );

    drawLines(context, randomLinesRef.current);
  }
}

interface CanvasProps {
  className?: string;
  pencilMan?: boolean;
  shareBar?: boolean;
  lines: boolean;
}
export default function Canvas({
  className,
  pencilMan,
  shareBar,
  lines,
}: CanvasProps) {
  // Refs for canvas and container
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // State for container dimensions
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerLoaded, setContainerLoaded] = useState(false);
  // State for pencil text
  const [randomWord, setRandomWord] = useState(words[0]);
  const [clickCount, setClickCount] = useState(0);

  const [currentLine, setCurrentLine] = useState<{
    points: { x: number; y: number }[];
  } | null>(null);
  const currentLineRef = useRef(currentLine);
  useEffect(() => {
    currentLineRef.current = currentLine;
  }, [currentLine]);

  //////////////////////////////////////////////////////////////
  // RANDOM LINES///////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  // State for random lines
  const [randomLines, setRandomLines] = useState<{ x: number; y: number }[][]>(
    []
  );
  // Ref for random lines
  const randomLinesRef = useRef(randomLines);
  // When randomLines state changes, update the ref
  useEffect(() => {
    randomLinesRef.current = randomLines;
  }, [randomLines]);

  //////////////////////////////////////////////////////////////
  // USER DRAWN LINES///////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  // State for user drawn lines
  const [userDrawnLines, setUserDrawnLines] = useState<
    { x: number; y: number }[][]
  >([]);
  // Refs for drawing
  const userDrawnLinesRef = useRef(userDrawnLines);
  // When userDrawnLines state changes, update the ref
  useEffect(() => {
    userDrawnLinesRef.current = userDrawnLines;
    let context = canvasRef.current?.getContext("2d");
    if (context) {
      drawLines(context, userDrawnLinesRef.current, 2, "round", "#000000");
    }
    console.log("User drawn lines:", userDrawnLinesRef.current);
  }, [userDrawnLines]);

  useEffect(() => {
    console.log("currentLine", currentLine);
  }, [currentLine]);

  // Local vars for drawing
  let isDrawing = false;

  //////////////////////////////////////////////////////////////
  // EFFECTS///////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  // When the canvas container is loaded capture its dimensions
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContainerHeight(containerRef.current.offsetHeight);
      setContainerLoaded(true);
    }
  }, [containerRef.current]);

  // Fetch random lines on component mount
  useEffect(() => {
    if (lines) {
      fetchRandomLines(containerWidth, containerHeight).then((lines) => {
        const transformedLines = lines.map((line: any[]) =>
          line.map((point) => ({ x: point[0], y: point[1] }))
        );
        setRandomLines(transformedLines);
      });
    }
  }, [containerWidth, containerHeight]);

  // Draw random lines + init canvas on canvas ON randomLines state change
  useEffect(() => {
    if (canvasRef.current && randomLines) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        initializeCanvas();
        drawLines(context, randomLines);
      }
    }
  }, [randomLines]);

  // DRAWING FUNCTIONS
  function initializeCanvas() {
    if (!containerRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");

    // Wipe the canvas clean
    clearCanvas();

    if (canvasRef.current) {
      // Event listeners for drawing
      canvasRef.current.addEventListener("mousedown", (e) => startDrawing(e));
      canvasRef.current.addEventListener("mousemove", (e) => draw(e));
      canvasRef.current.addEventListener("mouseup", () => stopDrawing());
      canvasRef.current.addEventListener("mouseout", () => stopDrawing());

      // Touch event listeners for drawing
      canvasRef.current.addEventListener("touchstart", (e) => startDrawing(e));
      canvasRef.current.addEventListener("touchmove", (e) => draw(e));
      canvasRef.current.addEventListener("touchend", () => stopDrawing());
    }
  }

  function clearCanvas() {
    if (!canvasRef.current) return;
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  function startDrawing(event: MouseEvent | TouchEvent) {
    event.preventDefault(); // Prevent scrolling on touch devices
    isDrawing = true;
    // Get the coordinates of the cursor
    const [x_temp, y_temp] = getXY(event);
    // Set the starting point of the line segment
    setCurrentLine({ points: [{ x: x_temp, y: y_temp }] });
  }

  function getXY(event: MouseEvent | TouchEvent): [number, number] {
    if (!canvasRef.current) return [0, 0];
    const rect = canvasRef.current.getBoundingClientRect();
    let x_temp: number = 0,
      y_temp: number = 0;

    if (event.type.startsWith("touch")) {
      if (event instanceof TouchEvent) {
        x_temp = event.touches[0].clientX - rect.left;
        y_temp = event.touches[0].clientY - rect.top;
      }
    } else {
      x_temp = (event as MouseEvent).clientX - rect.left;
      y_temp = (event as MouseEvent).clientY - rect.top;
    }

    // Scale the coordinates
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    return [x_temp * scaleX, y_temp * scaleY];
  }

  function draw(event: MouseEvent | TouchEvent) {
    if (!canvasRef.current) return;
    let context = canvasRef.current.getContext("2d");
    if (!context) return;
    if (!isDrawing || !context || !canvasRef.current || !currentLine) return;

    // Get the coordinates of the cursor
    const [x_temp, y_temp] = getXY(event);
    setCurrentLine({
      points: [...currentLine.points, { x: x_temp, y: y_temp }],
    });

    // draw the current line
    drawLines(context, [currentLine.points], 2, "round", "#000000");
  }

  function stopDrawing() {
    console.log("stopDrawing called");
    if (!isDrawing) return;
    isDrawing = false;
    // Store the completed line segment in the userDrawings array
    if (currentLineRef.current && currentLineRef.current.points) {
      console.log("stopDrawing calleddwadaw");
      setUserDrawnLines([
        ...userDrawnLinesRef.current,
        currentLineRef.current.points,
      ]);
      setCurrentLine(null);
    }
  }

  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
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
        "xs:w-[100%]",
        "sm:w-[90%]",
        "h-fit",
        "mx-auto",
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
          "w-[100%]",
          "max-w-[98vw]",
          "sm:max-w-[90%]"
        )}
      >
        {pencilMan && (
          <div className="w-11/12">
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
            "rounded-3xl",
            "flex",
            "flex-grow",
            "border-dashed",
            "border-gray-700",
            "border-2",
            "w-[100%]",
            "max-h-[40vh]",
            "min-h-[40vh]"
          )}
        >
          <div className="flex flex-grow">
            {containerLoaded && (
              <canvas
                className="static fade-in cursor-crosshair ani-fade-in w-[100%] h-[100%]"
                ref={canvasRef as RefObject<HTMLCanvasElement>}
                onClick={() => {
                  setClickCount((prevCount) => prevCount + 1);
                }}
                width={containerWidth}
                height={containerHeight}
              ></canvas>
            )}
          </div>
        </div>
        <div className="w-full">
          <CanvasButtons
            description={randomWord}
            canvasRef={canvasRef}
            randomLinesRef={randomLinesRef}
            userDrawnLinesRef={userDrawnLinesRef}
            setUserDrawnLines={setUserDrawnLines}
          />
        </div>
      </div>
    </div>
  );
}
