import { Point, Stroke } from "../redux/types";

interface InitialStrokeSettings {
  x: number;
  y: number;
  color: string;
  thickness: number;
};

export const startStroke = (
  ctx: CanvasRenderingContext2D,
  {x, y, color, thickness}: InitialStrokeSettings
) => {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = thickness;
  ctx.beginPath();
  ctx.moveTo(x, y);
};

export const drawStroke = (ctx: CanvasRenderingContext2D, {x, y}: Point) => {
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, (ctx.lineWidth / 2)*0.9, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, y);
};

export const redraw = (canvas: HTMLCanvasElement | null, strokes: Stroke[]) => {
  if (!canvas?.getContext) return;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  strokes.forEach(stroke => {
    ctx.strokeStyle = stroke.color;
    ctx.fillStyle = stroke.color;
    ctx.lineWidth = stroke.thickness;

    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    stroke.points.forEach(point => {
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(point.x, point.y, (ctx.lineWidth / 2)*0.9, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    });
  });
};

export const getCanvasImage = (canvas: HTMLCanvasElement | null): 
Promise<Blob | null> => {
  return new Promise((res, rej) => {
    if (!canvas) return rej(null);
    canvas.toBlob(res);
  });
}