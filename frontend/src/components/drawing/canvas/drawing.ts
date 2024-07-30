// Variables for canvas and drawing
let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;
let isDrawing = false;
let userDrawings: { points: { x: number; y: number }[] }[] = []; // Array to store user's drawings
let currentLine: { points: { x: number; y: number }[] } | null = null; // Variable to store the current line segment

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

////////////////////////////////
// Entry function
////////////////////////////////

export function initializeCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  randomLines: { x: number; y: number }[][],
  contextRef: CanvasRenderingContext2D
) {
  console.log("initializeCanvas: canvasRef", canvasRef);

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

// // Undo the last line segment drawn by the user
export function undoLastStroke(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  randomLines: { x: number; y: number }[][]
) {
  // Remove the last line segment from the userDrawings array
  userDrawings.pop();

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  // redraw random lines:
  drawRandomLines(randomLines, { current: canvas }, context);

  // Redraw all the user's line segments
  drawLines(
    context,
    userDrawings.map((line) => line.points),
    3,
    "round",
    "black"
  );
}

////////////////////////////////
// Drawing functions
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
    // Draw the user lines
    drawLines(
      context,
      userDrawings.map((line) => line.points),
      3,
      "round",
      "black"
    );

    // draw the random lines
    drawLines(context, randomLines, 3, "round", "#8F95FF");
  }
}

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
    //stopDrawing();
    //return;
  }

  currentLine.points.push({ x: x_temp, y: y_temp });
  // clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  // redraw random lines:
  drawRandomLines(randomLines, { current: canvas }, context);

  context.strokeStyle = "black";
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
