export type RootState = {
  currentStroke: Stroke,
  strokes: Stroke[],
  historyIndex: number,
  modals: {
    modalName: ModalTypes | null,
    isShown: boolean,
  },
  projectsList: {
    error: string | null,
    pending: boolean,
    projects: Project[],
  },
};

export type Project = {
  image: string,
  name: string,
  id: string,
};

export type Stroke = {
  points: Point[],
  color: string,
  thickness: number,
};

export type Point = {
  x: number,
  y: number,
};

export type ModalTypes =
  "PROJECTS_MODAL" |
  "PROJECT_SAVE_MODAL";