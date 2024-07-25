import { FaUndo } from "react-icons/fa";
import React from "react";

// // Undo the last line segment drawn by the user
// function undoLastStroke() {
//   // Remove the last line segment from the userDrawings array
//   userDrawings.pop();

//   // Clear the canvas
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   // redraw random lines:
//   drawRandomLines();

//   // Redraw all the user's line segments
//   userDrawings.forEach(function (line) {
//     context.beginPath();
//     context.moveTo(line.points[0].x, line.points[0].y);
//     for (let i = 1; i < line.points.length; i++) {
//       context.lineTo(line.points[i].x, line.points[i].y);
//     }
//     context.stroke();
//   });
// }

export default function CanvasButtons({ className }: { className?: string }) {
  return (
    <div className={`${className} flex justify-between mt-3`}>
      <button
        id="back-button"
        className="text-lg w-full flex justify-center items-center xs:text-3xl"
        //   onClick={undoLastStroke}
      >
        <FaUndo />
      </button>
      <button
        id="submit-button"
        className="text-lg w-full xs:text-3xl"
        //   onClick={submitDrawing}
      >
        Submit
      </button>
    </div>
  );
}
