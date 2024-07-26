import React from "react";
import { daily } from "@/types/daily";

interface CanvasContextProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  randomLines: { x: number; y: number }[][];
  daily: daily;
  submitUrl: string;
  redirectUrl: string;
}

interface CanvasContextProviderProps extends CanvasContextProps {
  children: React.ReactNode;
}

export const CanvasContext = React.createContext({} as CanvasContextProps);

export const CanvasContextProvider: React.FC<CanvasContextProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <CanvasContext.Provider value={props}>{children}</CanvasContext.Provider>
  );
};
