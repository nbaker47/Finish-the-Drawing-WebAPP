"use client";

import { FaUndo } from "react-icons/fa";
import React, { useContext } from "react";
import { undoLastStroke } from "./drawing";
import { submitDrawing } from "./submitDrawing";
import { daily } from "@/types/daily";
import { CanvasContext } from "@/app/draw/CanvasContext";

interface CanvasButtonsProps {
  className?: string;
  description?: string;
}

export default function CanvasButtons({
  className,
  description,
}: CanvasButtonsProps) {
  const { canvasRef, randomLines, daily, submitUrl, redirectUrl } =
    useContext(CanvasContext);

  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");

  const handleUndo = () => {
    if (canvas && context && randomLines) {
      undoLastStroke(canvas, context, randomLines);
    }
  };

  const handleSubmit = () => {
    if (canvas && context) {
      if (daily && description) {
        submitDrawing(
          submitUrl,
          canvas,
          redirectUrl,
          daily,
          description,
          "NULL_USER"
        );
      }
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
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
