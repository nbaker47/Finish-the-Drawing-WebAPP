import React from "react";
import Canvas from "@/components/drawing/Canvas";
import Title from "@/app/draw/Title";
import clsx from "clsx";
import Sharebar from "@/components/Sharebar";

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
          "pt-1"
        )}
      >
        <div
          className={clsx(
            //
            "w-4/5",
            // small screen
            "xs:w-11/12",
            "xs:h-4/5",
            // medium screen
            "md:w-4/5",
            //
            "bg-blue-zigzag",
            "border-2",
            "border-gray-700",
            "rounded-3xl",
            "p-2"
          )}
        >
          <Title word={await fetchWord()} className="mb-2 mt-2" />
          <Sharebar className="mb-2" />
          <Canvas />
        </div>
      </main>
    </>
  );
}
