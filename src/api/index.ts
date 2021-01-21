import { Stroke } from "../redux/types";

export const ReduxPaintAPI = {
  // Saving current project
  save: async (name: string, strokes: Stroke[], image: string) => {
    const response = await fetch("http://localhost:4000/projects/new", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, strokes, image }),
    });

    return response.json();
  },

  // Loading projects
  load: async () => {
    const response = await fetch("http://localhost:4000/projects");
    return response.json();
  },

  // Load one project
  loadOne: async (id: string) => {
    const response = await fetch(`http://localhost:4000/projects/${id}`);
    return response.json();
  },
}