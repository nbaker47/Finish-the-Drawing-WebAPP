export function drawLines(
  context: CanvasRenderingContext2D,
  lines: { x: number; y: number }[][],
  lineWidth: number = 5,
  lineCap: CanvasLineCap = "round",
  strokeStyle: string = "#8F95FF"
) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  context.lineWidth = lineWidth;
  context.lineCap = lineCap;
  context.strokeStyle = strokeStyle;

  lines.forEach((line) => {
    console.log("drawLines: line", line);
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
