import { drawingResponse } from "@/types/drawing";
import React from "react";
import { FaTrophy } from "react-icons/fa";
import "./card.css";
import { FaRegHeart } from "react-icons/fa";
import { BiDislike } from "react-icons/bi";
import clsx from "clsx";

const Card = ({
  submission,
  index,
}: {
  submission: drawingResponse;
  index: number;
}) => {
  console.log(`index: ${index}`);
  return (
    <div
      className={` flex flex-col p-4 shadow-md bg-white rounded-3xl text-black border-2 border-gray-900 max-w-[300px] md:max-w-[500px] ${
        index === 0 ? "first-card" : ""
      } ${index === 1 ? "second-card" : ""} ${index === 2 ? "third-card" : ""}`}
    >
      {(index as number) < 3 && (
        <div className="podium flex items-center justify-center text-3xl">
          {index == 0 && <FaTrophy style={{ color: "#ffc800" }} />}
          {index == 1 && <FaTrophy style={{ color: "silver" }} />}
          {index == 2 && <FaTrophy style={{ color: "#cd7f32" }} />}
        </div>
      )}
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex flex-col items-center justify-center">
          <img
            src={submission.image}
            alt="Submission Image"
            className="submission-image m-2 object-contain"
            id={`image-${submission.id}`}
            style={{ width: "auto", maxHeight: "180px" }}
          />
        </div>
        <div className=" rounded-xl ">
          <div
            className={`p-2 text-neutral-800 flex flex-row items-center justify-start  `}
            style={{ right: "-30px" }}
          >
            <div className="flex items-center mr-4">
              <FaRegHeart className="text-xl font-bold" />
              <span className="ml-2 text-3">{submission.likes}</span>
            </div>
            <div className="flex items-center">
              <BiDislike className="text-xl font-bold" />
              <span className="ml-2 text-lg">{submission.dislikes}</span>
            </div>
          </div>
        </div>
        <span
          className={clsx(
            "flex",
            "items-center",
            "justify-center",
            "text-center",
            "mx-auto",
            "font-exo",
            "rounded-xl",
            "ftd-border-dashed",
            "p-2",
            "h-[120px]"
            // "text-[80%]"
          )}
          style={{ backgroundColor: "rgba(78, 197, 255, 0.59)" }}
        >
          {submission.description}
        </span>
      </div>
    </div>
  );
};

export default Card;
