import React from "react";
import { useSelector } from "react-redux";
import { ProjectsModal } from "./ProjectsModal";
import { ProjectSaveModal } from "./ProjectSaveModal";
import { ModalTypes } from "../redux/types";
import { selectModalName } from "../redux/selectors";


export const ModalLayer = () => {
  const modalName = useSelector(selectModalName) as ModalTypes;

  switch (modalName) {
    case "PROJECTS_MODAL": {
      return <ProjectsModal />;
    }

    case "PROJECT_SAVE_MODAL": {
      return <ProjectSaveModal />;
    }

    default: {
      return null;
    }
  }
};