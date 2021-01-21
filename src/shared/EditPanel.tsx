import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { undo, redo } from "../redux/actions";
import { selectStrokes } from "../redux/selectors";

export const EditPanel = () => {
  const dispatch = useDispatch();
  const strokes = useSelector(selectStrokes);

  return (
    <div className="window draggable">
      <div className="title-bar">
        <div className="title-bar-text">Edit</div>
      </div>
      <div className="window-body">
        <div className="field-row">
          <button className="button undo"
            onClick={() => dispatch(undo(strokes.length))}
          >
            Undo
          </button>
          <button className="button redo"
            onClick={() => dispatch(redo())}
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  );
}