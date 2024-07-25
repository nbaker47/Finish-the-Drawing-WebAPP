import React from "react";
import Canvas from "@/components/drawing/Canvas";
import Title from "@/app/draw/Title";
import clsx from "clsx";

async function fetchWord() {
  let url = process.env.NEXT_PUBLIC_API_URL + "/daily";
  let response = await fetch(url);
  let data = await response.json();
  return data.word;
}

export default async function Page() {
  return (
    <>
      <main
        className={clsx(
          "flex",
          "items-center",
          "justify-center",
          "w-screen",
          "flex-grow",
          "pt-1"
        )}
        // style={{ maxHeight: "calc(100vh - 1rem)" }}
      >
        <div
          className={clsx(
            //
            "w-full",
            //
            "xs:w-11/12",
            "max-w-screen-md",
            //
            "bg-blue-zigzag",
            "border-2",
            "border-gray-700",
            "rounded-3xl",
            "py-2",
            "px-1",
            "flex", // Add this
            "flex-col", // Add this
            "items-center", // Add this
            "justify-center" // Add this
          )}
          style={{
            boxShadow: "3px 3px 3px 2px rgba(0, 0, 0, 0.23)",
            maxHeight: "calc(100vh - 5rem)",
          }}
        >
          <Title word={await fetchWord()} className="mt-2" wordClassName="" />
          <Canvas pencilMan={false} />
        </div>
      </main>
    </>
  );
}
