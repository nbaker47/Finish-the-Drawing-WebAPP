// // Define a counter variable to keep track of the number of strokes
// let strokeCounter = 0;

// // Variables for canvas and drawing
// const canvas = document.getElementById("drawing-canvas") as HTMLCanvasElement;
// const context = canvas.getContext("2d");

// let isDrawing = false;
// let isFirstTouch = true; // Flag to differentiate between first touch and random lines
// const userDrawings: { points: { x: number; y: number }[] }[] = []; // Array to store user's drawings
// let currentLine: { points: { x: number; y: number }[] } | null = null; // Variable to store the current line segment

// // Event listeners for drawing
// canvas.addEventListener("mousedown", startDrawing);
// canvas.addEventListener("mousemove", draw);
// canvas.addEventListener("mouseup", stopDrawing);
// canvas.addEventListener("mouseout", stopDrawing);

// // Touch event listeners for drawing
// canvas.addEventListener("touchstart", startDrawing);
// canvas.addEventListener("touchmove", draw);
// canvas.addEventListener("touchend", stopDrawing);

// // Get the scale factor for transforming screen space to canvas space
// function elementScale(): number {
//   const el = canvas;
//   return el.width / el.offsetWidth;
// }

// // Get cursor coordinates
// function getXY(event: MouseEvent | TouchEvent): [number, number] {
//   const rect = canvas.getBoundingClientRect();
//   let x_temp: number = 0,
//     y_temp: number = 0;

//   if (event.type.startsWith("touch")) {
//     if (event instanceof TouchEvent) {
//       x_temp = (event.touches[0].clientX - rect.left) * elementScale();
//       y_temp = (event.touches[0].clientY - rect.top) * elementScale();
//     }
//   } else {
//     x_temp = ((event as MouseEvent).clientX - rect.left) * elementScale();
//     y_temp = ((event as MouseEvent).clientY - rect.top) * elementScale();
//   }

//   return [x_temp, y_temp];
// }

// // Start drawing function
// function startDrawing(event: MouseEvent | TouchEvent) {
//   event.preventDefault(); // Prevent scrolling on touch devices
//   isDrawing = true;

//   // Get the coordinates of the cursor
//   const [x_temp, y_temp] = getXY(event);

//   // Set the starting point of the line segment
//   currentLine = {
//     points: [{ x: x_temp, y: y_temp }],
//   };
// }

// function checkIntersection(
//   x1: number,
//   y1: number,
//   x2: number,
//   y2: number
// ): boolean {
//   const randomLines: any[] = []; // Declare the randomLines variable

//   for (const line of randomLines) {
//     for (let j = 1; j < line.length; j++) {
//       const x3 = line[j - 1].x;
//       const y3 = line[j - 1].y;
//       const x4 = line[j].x;
//       const y4 = line[j].y;

//       const intersect = getLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4);
//       if (intersect) {
//         return true; // Intersection found
//       }
//     }
//   }
//   return false; // No intersection found
// }

// function getLineIntersection(
//   x1: number,
//   y1: number,
//   x2: number,
//   y2: number,
//   x3: number,
//   y3: number,
//   x4: number,
//   y4: number
// ): { x: number; y: number } | null {
//   const ua =
//     ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
//     ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
//   const ub =
//     ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
//     ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

//   if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
//     const x = x1 + ua * (x2 - x1);
//     const y = y1 + ua * (y2 - y1);
//     return { x, y };
//   }
//   return null;
// }

// // Draw on the canvas
// function draw(event: MouseEvent | TouchEvent) {
//   // Get the coordinates of the cursor
//   const [x_temp, y_temp] = getXY(event);

//   if (!isDrawing) return;

//   // Check if the current line segment intersects with any of the random lines
//   const isIntersecting = checkIntersection(
//     currentLine!.points[0].x,
//     currentLine!.points[0].y,
//     x_temp,
//     y_temp
//   );

//   if (isIntersecting) {
//     // If intersection occurs, stop drawing
//     stopDrawing();
//     return;
//   }

//   context.lineWidth = 5;
//   context.lineCap = "round";

//   currentLine!.points.push({ x: x_temp, y: y_temp });

//   // clear the canvas
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   // redraw random lines:
//   drawRandomLines();

//   userDrawings.forEach(function (line) {
//     context.beginPath();
//     context.moveTo(line.points[0].x, line.points[0].y);
//     for (let i = 1; i < line.points.length; i++) {
//       context.lineTo(line.points[i].x, line.points[i].y);
//     }
//     context.stroke();
//   });

//   context.beginPath();
//   context.moveTo(currentLine!.points[0].x, currentLine!.points[0].y);
//   for (let i = 1; i < currentLine!.points.length; i++) {
//     context.lineTo(currentLine!.points[i].x, currentLine!.points[i].y);
//   }
//   context.stroke();
// }

// // Stop drawing
// function stopDrawing() {
//   if (!isDrawing) return;
//   isDrawing = false;
//   // Store the completed line segment in the userDrawings array
//   userDrawings.push(currentLine!);
//   // Call the updatePencilText function
//   //   updatePencilText();
// }
