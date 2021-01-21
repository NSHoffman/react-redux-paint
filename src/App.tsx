import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCanvas } from "./CanvasContext";
import { endStroke } from "./redux/sharedActions";
import { beginStroke, updateStroke } from './redux/actions';
import { selectStrokes, selectCurrentStroke, selectHistoryIndex } from "./redux/selectors";
import { drawStroke, startStroke, redraw } from './utils/canvasUtils';
import { ModalLayer } from "./modals/ModalLayer";
import { WidgetPanel } from "./shared/WidgetPanel";

const WIDTH = 1024;
const HEIGHT = 768;

function App() {
  // State management
  const canvasRef = useCanvas();
  const getCanvasWithContext = useCallback((canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext("2d")};
  }, [canvasRef]);

  const dispatch = useDispatch();
  const currentStroke = useSelector(selectCurrentStroke);
  const strokes = useSelector(selectStrokes);
  const historyIndex = useSelector(selectHistoryIndex);
  const isDrawing = !!currentStroke.points.length;

  // Drawing handlers
  const startDrawing = ({ nativeEvent }: React.MouseEvent) => {
    const { canvas, context } = getCanvasWithContext();
    if (canvas && context) {
      const { offsetX, offsetY } = nativeEvent;
      dispatch(beginStroke({x: offsetX, y: offsetY}));
  
      startStroke(context, {
        x: offsetX, 
        y: offsetY, 
        color: currentStroke.color, 
        thickness: currentStroke.thickness
      });
    }
  };
  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({limit: historyIndex, stroke: currentStroke}));
    }
  };
  const draw = ({ nativeEvent }: React.MouseEvent) => {
    const { canvas, context } = getCanvasWithContext();
    if (isDrawing && canvas && context) {
      const { offsetX, offsetY } = nativeEvent;
      dispatch(updateStroke({x: offsetX, y: offsetY}));
      drawStroke(context, { x: offsetX, y: offsetY });
    }    
  };

  // Redraw on history traversals
  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (canvas && context) {
      redraw(canvas, strokes.slice(0, strokes.length - historyIndex));
    }
  }, [strokes, historyIndex, getCanvasWithContext]);

  return (
    <div className="window">
      <ModalLayer />
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button className="x-button"/>
        </div>
      </div>
    
      <WidgetPanel />
    
      <canvas
        width={WIDTH}
        height={HEIGHT}
        ref={canvasRef} 
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
      />
    </div>
  );
}

export default App;
