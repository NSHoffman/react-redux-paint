import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../redux/actions";
import { loadProject } from "../redux/actions";
import { getProjectsList } from "../redux/actions";
import { selectProjectsList } from "../redux/selectors";


export const ProjectsModal = () => {
  const dispatch = useDispatch();
  const projectsList = useSelector(selectProjectsList);

  const onLoadProject = (id: string) => {
    dispatch(loadProject(id));
    dispatch(hide());
  }

  useEffect(() => {
    dispatch(getProjectsList());
  }, [dispatch]);

  return (
    <div className="window modal-panel draggable">
      <div className="title-bar">
        <div className="title-bar-text">Counter</div>
        <div className="title-bar-controls">
          <button className="x-button" onClick={() => dispatch(hide())}/>
        </div>
      </div>

      <div className="projects-container">
      {(projectsList.projects || []).map(project => (
        <div
          key={project.id}
          onClick={() => onLoadProject(project.id)} 
          className="project-card"
        >
          <img src={project.image} alt="thumbnail" />
          <div>{project.name}</div>
        </div>
      ))}
      </div>
    </div>
  );
};