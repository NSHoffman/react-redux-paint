import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStrokeThickness } from "../redux/actions";
import { selectCurrentStroke } from "../redux/selectors";


export const BrushPanel: React.FC = () => {
  const dispatch = useDispatch();
  const {thickness} = useSelector(selectCurrentStroke);

  return (
    <div className="window draggable">
      <div className="title-bar">
        <div className="title-bar-text">Brush</div>
      </div>

      <div className="window-body">
        <span>{thickness}</span>
        <input 
          type="range" 
          min="2" max="10"
          onChange={(e) => dispatch(setStrokeThickness(+e.target.value))}
          value={thickness}
        />
      </div>
    </div>
  );
}