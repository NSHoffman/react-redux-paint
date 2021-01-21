import React, {
  createContext,
  useRef,
  RefObject,
  useContext
} from "react";

type CanvasRef = RefObject<HTMLCanvasElement>;
export const CanvasContext = createContext<CanvasRef>({} as CanvasRef);

export const CanvasProvider: React.FC = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <CanvasContext.Provider value={canvasRef}>
      { children }
    </CanvasContext.Provider>
  );
};


export const useCanvas = () => useContext(CanvasContext);