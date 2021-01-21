import React from "react";
import { BrushPanel } from "./BrushPanel";
import { ColorPanel } from "./ColorPanel";
import { EditPanel } from "./EditPanel";
import { FilePanel } from "./FilePanel";


export const WidgetPanel = () => {

  return (
    <div className="flex-panel">
      <ColorPanel />
      <FilePanel />
      <EditPanel />
      <BrushPanel />
    </div>
  );
}