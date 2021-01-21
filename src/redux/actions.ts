export { undo, redo } from "./historyIndex/slice";
export { beginStroke, updateStroke, setStrokeColor, setStrokeThickness } from "./currentStroke/slice";
export { show, hide } from "./modals/slice";

export { 
  asyncSaveProject as saveProject,
  asyncLoadProject as loadProject
} from "./strokes/sagas";
export { asyncLoadProjects as getProjectsList } from "./projectsList/sagas";


