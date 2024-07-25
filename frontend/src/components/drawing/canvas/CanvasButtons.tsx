import { FaUndo } from "react-icons/fa";
import React from "react";
import { undoLastStroke } from "./drawing";

export default function CanvasButtons({
  className,
  canvas,
  context,
  randomLines,
}: {
  className?: string;
  canvas?: HTMLCanvasElement | null;
  context?: CanvasRenderingContext2D | null;
  randomLines?: { x: number; y: number }[][];
}) {
  const handleUndo = () => {
    if (canvas && context && randomLines) {
      undoLastStroke(canvas, context, randomLines);
    }
  };

  return (
    <div className={`${className} flex justify-between mt-3`}>
      <button
        id="back-button"
        className="text-lg w-full flex justify-center items-center xs:text-2xl text-black"
        onClick={handleUndo}
      >
        <FaUndo />
      </button>
      <button
        id="submit-button"
        className="text-lg w-full xs:text-2xl text-black"
        // onClick={submitDrawing}
      >
        Submit
      </button>
    </div>
  );
}
