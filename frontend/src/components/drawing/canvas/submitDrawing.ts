import { drawingRequest } from "@/types/drawing";
import { daily } from "@/types/daily";

export function submitDrawing(
  submitUrl: string,
  canvas: HTMLCanvasElement,
  redirectUrl: string,
  daily: daily,
  description: string,
  user: string
) {
  const data = canvas.toDataURL();
  const body: drawingRequest = {
    daily: daily.id,
    image: data,
    description: description,
    user: user,
  };

  const bodyString = JSON.stringify(body);

  console.log(`Submitting data: ${bodyString} to: ${submitUrl}`);

  fetch(submitUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (!res.ok) {
        console.log(res);
        throw new Error("Network response was not ok");
      }
      return res;
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.href = redirectUrl;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      // Handle the error here
    });
}
