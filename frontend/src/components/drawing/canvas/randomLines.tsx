// Array to store randomly generated lines
// seeded random number generator
function seededRand(seed: number): number {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Add wavy line traversal to the canvas
export function pushRandomLines(
  i: number,
  randomLines: { x: number; y: number }[][],
  canvas: React.RefObject<HTMLCanvasElement>,
  context: CanvasRenderingContext2D,
  seed: number = Date.now()
): void {
  console.log("pushRandomLines: seed", seed);

  var n = 500; // Number of line segments
  var a = 0.1; // Angle aperture parameter
  var boundaryRange = 0.7; // Percentage of the canvas width/height to stay within
  var minLength =
    Math.min(canvas.current?.width || 0, canvas.current?.height || 0) * 0.3; // Minimum length of the line

  var canvasWidth = canvas.current?.width || 0;
  var canvasHeight = canvas.current?.height || 0;

  var centerX = canvasWidth / 2;
  var centerY = canvasHeight / 2;

  var boundaryWidth = canvasWidth * boundaryRange;
  var boundaryHeight = canvasHeight * boundaryRange;

  var startX =
    centerX - boundaryWidth / 2 + seededRand(i * seed * 1) * boundaryWidth;
  var startY =
    centerY - boundaryHeight / 2 + seededRand(i * seed * 2) * boundaryHeight;

  var x = startX;
  var y = startY;
  var angle = 0;
  var lineLength = 0;

  context.lineWidth = 5;
  context.lineCap = "round";

  var linePoints: { x: number; y: number }[] = []; // Array to store the points of the current line

  context.beginPath();
  context.moveTo(x, y);

  for (var k = 1; k <= n; k++) {
    var angleVariation = (2 * seededRand(i * seed * 3) - 1) * a * Math.PI;
    angle += angleVariation;

    // Calculate the maximum distance from the boundary
    var maxDistanceX = Math.min(
      boundaryWidth / 2 - Math.abs(x - centerX),
      boundaryWidth / 2
    );
    var maxDistanceY = Math.min(
      boundaryHeight / 2 - Math.abs(y - centerY),
      boundaryHeight / 2
    );

    var maxLength = Math.min(maxDistanceX, maxDistanceY);

    // Calculate the remaining length to reach the minimum length
    var remainingLength = minLength - lineLength;
    var r = Math.min(remainingLength, seededRand(i * seed * 4) * maxLength);

    x += r * Math.cos(angle);
    y += r * Math.sin(angle);

    lineLength += r;

    context.lineTo(x, y);
    linePoints.push({ x: x, y: y });

    // Exit the loop if the line reaches the minimum length
    if (lineLength >= minLength) {
      break;
    }
  }

  randomLines.push(linePoints); // Store the points of the line in the array
}

// Draw all randomly generated lines
export function drawRandomLines(
  randomLines: { x: number; y: number }[][],
  canvas: React.RefObject<HTMLCanvasElement>,
  context: CanvasRenderingContext2D
): void {
  if (canvas.current) {
    console.log("drawRandomLines: canvas.current", canvas.current);

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

// // Drawing random lines
// window.addEventListener("load", function () {
//   // Call the function to add x random lines when the page loads
//   for (var i = 0; i < 7; i++) {
//     pushRandomLines(i);
//   }
//   // Clear the canvas
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   // Redraw random lines:
//   drawRandomLines();
// });
