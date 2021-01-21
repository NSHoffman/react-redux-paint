import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { hide } from "../redux/actions";
import { getCanvasImage } from "../utils/canvasUtils";
import { useCanvas } from "../CanvasContext";
import { getBase64Thumbnail } from "../utils/scaler";
import { saveProject } from "../redux/actions";


export const ProjectSaveModal = () => {
  const canvasRef = useCanvas();
  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState("");

  const onProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };
  const onProjectSave = async () => {
    const file = await getCanvasImage(canvasRef.current);
    if (!file) return;

    const thumbnail = await getBase64Thumbnail({ file, scale: 0.1 });
    dispatch(saveProject({ name: projectName, thumbnail }));
    setProjectName("");
    dispatch(hide());
  };

  return (
    <div className="window modal-panel draggable">
      <div className="title-bar">
        <div className="title-bar-text">Save</div>
      </div>

      <div className="window-body">
        <div className="field-row-stacked">
          <label htmlFor="projectName">Project Name</label>
          <input 
            className="text-input" 
            type="text" 
            id="projectName" 
            onChange={onProjectNameChange}
            autoComplete="off"
          />
        </div>

        <div className="field-row">
          <button className="button" onClick={onProjectSave}>Save</button>
          <button className="button" onClick={() => dispatch(hide())}>Cancel</button>
        </div>
      </div>
    </div>
  );
};