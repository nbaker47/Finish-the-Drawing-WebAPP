// Define a counter variable to keep track of the number of strokes
let strokeCounter = 0;

// Variables for canvas and drawing
let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;

let isDrawing = false;
let isFirstTouch = true; // Flag to differentiate between first touch and random lines
const userDrawings: { points: { x: number; y: number }[] }[] = []; // Array to store user's drawings
let currentLine: { points: { x: number; y: number }[] } | null = null; // Variable to store the current line segment

////////////////////////////////
// Entry function
////////////////////////////////

export function initializeCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  randomLines: { x: number; y: number }[][],
  contextRef: CanvasRenderingContext2D
) {
  canvas = canvasRef.current;
  if (canvas) {
    context = canvas.getContext("2d");

    drawRandomLines(randomLines, canvasRef, contextRef);

    // Event listeners for drawing
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", (e) => draw(e, randomLines));
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    // Touch event listeners for drawing
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", (e) => draw(e, randomLines));
    canvas.addEventListener("touchend", stopDrawing);
  }
}

////////////////////////////////
// Helper functions
////////////////////////////////

// Draw all randomly generated lines
export function drawRandomLines(
  randomLines: { x: number; y: number }[][],
  canvas: React.RefObject<HTMLCanvasElement>,
  context: CanvasRenderingContext2D
): void {
  if (canvas.current) {
    // console.log("drawRandomLines: canvas.current", canvas.current);

    context.clearRect(0, 0, canvas.current.width, canvas.current.height);

    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = "#8F95FF"; // Set the line color to blue

    randomLines.forEach((linePoints) => {
      context.beginPath();
      context.moveTo(linePoints[0].x, linePoints[0].y);
      for (var i = 1; i < linePoints.length; i++) {
        context.lineTo(linePoints[i].x, linePoints[i].y);
      }
      context.stroke();
    });
  }

  context.strokeStyle = "black"; // Set the line color back to black
}

// Get the scale factor for transforming screen space to canvas space
function elementScale(): number {
  if (!canvas) return 1;
  return canvas.width / canvas.offsetWidth;
}

function getXY(event: MouseEvent | TouchEvent): [number, number] {
  if (!canvas) return [0, 0];
  const rect = canvas.getBoundingClientRect();
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
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return [x_temp * scaleX, y_temp * scaleY];
}

// Start drawing function
function startDrawing(event: MouseEvent | TouchEvent) {
  event.preventDefault(); // Prevent scrolling on touch devices
  isDrawing = true;

  // Get the coordinates of the cursor
  const [x_temp, y_temp] = getXY(event);

  // Set the starting point of the line segment
  currentLine = {
    points: [{ x: x_temp, y: y_temp }],
  };
}

function checkIntersection(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  randomLines: { x: number; y: number }[][]
): boolean {
  for (const line of randomLines) {
    for (let j = 1; j < line.length; j++) {
      const x3 = line[j - 1].x;
      const y3 = line[j - 1].y;
      const x4 = line[j].x;
      const y4 = line[j].y;

      const intersect = getLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4);
      if (intersect) {
        return true; // Intersection found
      }
    }
  }
  return false; // No intersection found
}

function getLineIntersection(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number
): { x: number; y: number } | null {
  const ua =
    ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  const ub =
    ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    const x = x1 + ua * (x2 - x1);
    const y = y1 + ua * (y2 - y1);
    return { x, y };
  }
  return null;
}

////////////////////////////////
// Drawing functions
////////////////////////////////

function draw(
  event: MouseEvent | TouchEvent,
  randomLines: { x: number; y: number }[][]
) {
  if (!isDrawing || !context || !canvas || !currentLine) return;

  // Get the coordinates of the cursor
  const [x_temp, y_temp] = getXY(event);

  // Check if the current line segment intersects with any of the random lines
  const isIntersecting = checkIntersection(
    currentLine.points[0].x,
    currentLine.points[0].y,
    x_temp,
    y_temp,
    randomLines
  );

  if (isIntersecting) {
    // If intersection occurs, stop drawing
    stopDrawing();
    return;
  }

  context.lineWidth = 5;
  context.lineCap = "round";

  currentLine.points.push({ x: x_temp, y: y_temp });

  // clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  // redraw random lines:
  drawRandomLines(randomLines, { current: canvas }, context);

  userDrawings.forEach(function (line) {
    if (!context) return;
    context.beginPath();
    context.moveTo(line.points[0].x, line.points[0].y);
    for (let i = 1; i < line.points.length; i++) {
      context.lineTo(line.points[i].x, line.points[i].y);
    }
    context.stroke();
  });

  context.beginPath();
  context.moveTo(currentLine.points[0].x, currentLine.points[0].y);
  for (let i = 1; i < currentLine.points.length; i++) {
    context.lineTo(currentLine.points[i].x, currentLine.points[i].y);
  }
  context.stroke();
}

// Stop drawing
function stopDrawing() {
  if (!isDrawing) return;
  isDrawing = false;
  // Store the completed line segment in the userDrawings array
  if (currentLine) {
    userDrawings.push(currentLine);
  }
  // Call the updatePencilText function
  // updatePencilText();
}
