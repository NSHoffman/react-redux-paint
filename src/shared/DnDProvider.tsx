import React, { useEffect } from "react";


export const DnDProvider: React.FC = ({ children }) => {

  useEffect(() => {
    const handleDragStart = (evt: any) => {
      let target = evt.target;
      let isDraggable = false;
      if (target.tagName !== "DIV") return;
        
      while (target !== document.body) {
        if (target.classList.contains("draggable")) {
          isDraggable = true;
          break;
        }
        else if (target === document.body) return;
        else target = target.parentElement;
      }

      if (isDraggable) {
        const e: MouseEvent = evt;
        const el: HTMLElement = target;
        e.preventDefault();
  
        const { top, left } = el.getBoundingClientRect();
        const shiftX = e.clientX - left;
        const shiftY = e.clientY - top;
        el.style.transform = "none";
        el.style.position = "fixed";
        el.style.zIndex = "100";
        el.style.top = `${top}px`;
        el.style.left = `${left}px`;
        (el.firstElementChild as HTMLElement).style.cursor = "grabbing";
  
        const cancelDefaultDrag = (e: MouseEvent) => e.preventDefault();
        const handleDrag = (e: MouseEvent) => {
          const boxHeight = el.offsetHeight;
          const boxWidth = el.offsetWidth;
          const Y = e.clientY - shiftY;
          const X = e.clientX - shiftX;
  
          el.style.top = `${Y < 10 ? Math.max(Y, 0) : Math.min(Y, window.innerHeight - boxHeight)}px`;
          el.style.left = `${X < 10 ? Math.max(X, 0) : Math.min(X, window.innerWidth - boxWidth)}px`;
        };      
  
        const handleDragEnd = () => {
          el.style.zIndex = "99";
          (el.firstElementChild as HTMLElement).style.cursor = "grab";
          document.removeEventListener("dragstart", cancelDefaultDrag);
          document.removeEventListener("mousemove", handleDrag);
          document.removeEventListener("mouseup", handleDragEnd);
        }
  
        document.addEventListener("dragstart", cancelDefaultDrag);
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", handleDragEnd);
      }
    };
    document.addEventListener("mousedown", handleDragStart);

    return () => document.removeEventListener("mousedown", handleDragStart);
  });

  return <>
    { children }
  </>;
};