"use client";

import { drawingResponse } from "@/types/drawing";
import React, { use, useEffect } from "react";
import { FaTrophy } from "react-icons/fa";
import "./card.css";
import { FaRegHeart } from "react-icons/fa";
import { BiDislike } from "react-icons/bi";
import clsx from "clsx";
import { FaHeart } from "react-icons/fa";

function like(id: string, like: boolean) {
  const url =
    process.env.NEXT_PUBLIC_API_URL +
    "/drawing/" +
    id +
    (like ? "/like" : "/dislike");

  const payload = { user: "NULL_USER" };
  console.log({ url, payload });

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    console.log(response);
    if (response.status === 200) {
      console.log("Successfully liked/disliked");
    } else {
      console.error("Failed to like/dislike");
    }
  });
}

const Card = ({
  submission,
  index,
}: {
  submission: drawingResponse;
  index: number;
}) => {
  const handleLike = () => {
    if (liked || disliked) {
      return;
    }
    like(submission.id, true);
    setLikes(likes + 1);
    setLiked(true);

    // Save to localStorage
    localStorage.setItem(`liked-${submission.id}`, "true");
  };

  const handleDislike = () => {
    if (liked || disliked) {
      return;
    }
    like(submission.id, false);
    setDislikes(dislikes + 1);
    setDisliked(true);

    // Save to localStorage
    localStorage.setItem(`disliked-${submission.id}`, "true");
  };

  const [likes, setLikes] = React.useState(submission.likes);
  const [dislikes, setDislikes] = React.useState(submission.dislikes);

  const [liked, setLiked] = React.useState(
    localStorage.getItem(`liked-${submission.id}`) === "true"
  );
  const [disliked, setDisliked] = React.useState(
    localStorage.getItem(`disliked-${submission.id}`) === "true"
  );

  console.log(`index: ${index}`);
  return (
    <div
      className={` flex flex-col p-4 shadow-md bg-white rounded-3xl text-black border-2 border-gray-900 max-w-[300px] md:max-w-[500px] ${
        index === 0 ? "first-card" : ""
      } ${index === 1 ? "second-card" : ""} ${index === 2 ? "third-card" : ""}`}
    >
      {(index as number) < 3 && (
        <div className="podium flex items-center justify-center text-3xl">
          {index == 0 && (
            <FaTrophy
              style={{ color: "#ffc800", stroke: "black", strokeWidth: "16px" }}
            />
          )}
          {index == 1 && (
            <FaTrophy
              style={{ color: "silver", stroke: "black", strokeWidth: "16px" }}
            />
          )}
          {index == 2 && (
            <FaTrophy
              style={{ color: "#cd7f32", stroke: "black", strokeWidth: "16px" }}
            />
          )}
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
              {liked ? (
                <FaHeart
                  className={`text-xl font-bold cursor-pointer text-red-500 ani-bubble`}
                  onClick={handleLike}
                />
              ) : (
                <FaRegHeart
                  className={`text-xl font-bold cursor-pointer`}
                  onClick={handleLike}
                />
              )}

              <span className="ml-2 text-3">{likes}</span>
            </div>
            <div className="flex items-center cursor-pointer">
              <BiDislike
                className="text-xl font-bold"
                onClick={handleDislike}
              />
              <span className="ml-2 text-lg">{dislikes}</span>
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
