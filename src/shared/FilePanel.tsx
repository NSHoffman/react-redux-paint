import React from "react";
import { useDispatch } from "react-redux";
import { useCanvas } from "../CanvasContext";
import { saveAs } from "file-saver";
import { getCanvasImage } from "../utils/canvasUtils";
import { show } from "../redux/actions";


export const FilePanel = () => {
  const canvasRef = useCanvas();
  const dispatch = useDispatch();

  const exportToFile = async () => {
    const file = await getCanvasImage(canvasRef.current);
    if (!file) return;

    saveAs(file, "drawing.png");
  }

  return (
    <div className="window draggable">
      <div className="title-bar">
        <div className="title-bar-text">File</div>
      </div>
      <div className="window-body">
        <div className="field-row">
          <button className="button"
            onClick={exportToFile}
          >
            Export
          </button>

          <button className="button"
            onClick={() => dispatch(show("PROJECT_SAVE_MODAL"))}
          >
            Save
          </button>

          <button className="button"
            onClick={() => dispatch(show("PROJECTS_MODAL"))}
          >
            Load
          </button>
        </div>
      </div>
    </div>
  );
}