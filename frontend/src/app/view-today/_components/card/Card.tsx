import { drawingResponse } from "@/types/drawing";
import React from "react";
import { FaTrophy } from "react-icons/fa";
import "./card.css";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import clsx from "clsx";

const Card = ({
  submission,
  index,
}: {
  submission: drawingResponse;
  index?: number;
}) => {
  //   const vote = (element, id, direction) => {
  //     // Implement your voting logic here
  //   };

  //   const openCard = (id) => {
  //     // Implement your card opening logic here
  //   };

  //   const viewUser = (user) => {
  //     // Implement your user viewing logic here
  //   };

  console.log(`index: ${index}`);

  return (
    <div
      className={`flex flex-col p-4 shadow-md bg-white rounded-3xl text-black border-2 border-gray-900 max-w-[300px] md:max-w-[500px] h-[400px] ${
        index === 0 ? "first-card" : ""
      } ${index === 1 ? "second-card" : ""} ${index === 2 ? "third-card" : ""}`}
    >
      {(index as number) < 3 && (
        <div className="podium flex items-center justify-center text-3xl ">
          {index == 0 && <FaTrophy style={{ color: "#ffc800" }} />}
          {index == 1 && <FaTrophy style={{ color: "silver" }} />}
          {index == 2 && <FaTrophy style={{ color: "#cd7f32" }} />}
        </div>
      )}
      <div className="flex-grow">
        <div className="card-body">
          <div className="shadow-xl flex flex-col items-end relative mt-3">
            <div className="absolute z-50 bg-white rounded-lg p-2 text-neutral-800">
              <div className="flex items-center">
                <span className="mr-2 text-lg">{submission.likes}</span>
                <FaHeart />
              </div>
              <div className="flex items-center mt-2">
                <span className="mr-2 text-lg">{submission.dislikes}</span>

                <FaHeartBroken />
              </div>
            </div>
          </div>
          <img
            src={submission.image}
            alt="Submission Image"
            className="submission-image m-2"
            id={`image-${submission.id}`}
            style={{ width: "auto", height: "180px" }} // Adjust the height value as needed
          />
        </div>
        <div className="card-footer align-bottom">
          <span
            className={clsx(
              "flex",
              "items-center",
              "justify-center",
              "text-center",
              "mx-auto",
              "font-exo"
              // "text-sm"
            )}
          >
            {submission.description}
          </span>
        </div>
      </div>
      {/* {submission.user !== "Guest Drawer" && (
          <div className="user-insert ">
            <a href="#" onClick={() => viewUser(submission.user)}>
              <div
                className={`${submission.user.background} rounded-circle p-1`}
              >
                <img
                  src={submission.user.profile_picture}
                  className="rounded-circle shadow-4-strong"
                  width="80px"
                  height="80px"
                />
              </div>
              <span>{submission.user.user.username}</span>
            </a>
          </div>
        )} */}
    </div>
  );
};

export default Card;
