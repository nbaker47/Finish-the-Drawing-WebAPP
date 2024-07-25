import React from "react";
import "./animatedBg.css";
import PencilHappy from "@/components/drawing/pencil/pencil_happy.png";
import PencilSad from "@/components/drawing/pencil/pencil_sad.png";
import PencilNeutral from "@/components/drawing/pencil/pencil_neutral.png";
import Image from "next/image";

const AnimatedBackground = ({ children }: { children: React.ReactNode }) => {
  const images = [PencilHappy, PencilSad, PencilNeutral];

  return (
    <div className="animated-background">
      <div className="area">
        <ul className="circles">
          {[...Array(10)].map((_, index) => (
            <li key={index}>
              <Image
                src={images[Math.floor(Math.random() * images.length)]}
                alt="pencil"
                width={200}
                height={200}
                // className="w-20 h-20"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
