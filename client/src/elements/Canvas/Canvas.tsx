import { useLayoutEffect, useState } from "react";
import "./Canvas.css";

type x1 = number;
type y1 = number;
type x2 = number;
type y2 = number;

const colors = [`#6cce67ac`, `#e3a426ac`, `#4439baac`, `#d24ea4ac`];

const draw = (
  id: number,
  canvas: CanvasRenderingContext2D,
  cord: [x1, y1, x2, y2]
) => {
  const x1 = cord[0];
  const y1 = cord[1];
  const x2 = cord[2];
  const y2 = cord[3];

  canvas.fillStyle = colors[id % colors.length];
  canvas.strokeStyle = `#000`;
  canvas.fillRect(x1, y1, x2 - x1, y2 - y1);
  canvas.stroke();
};

const Canvas = ({
  id,
  width,
  height,
}: {
  id: string;
  width: number;
  height: number;
}) => {
  const [start, setStart] = useState(false);
  const [dim, setDim] = useState<[x1, y1, x2, y2][]>([]);

  useLayoutEffect(() => {
    const Canvas = document.getElementById(id) as HTMLCanvasElement | null;
    const canvas = Canvas?.getContext("2d");
    if (canvas && Canvas) {
      canvas.clearRect(0, 0, Canvas.width, Canvas.height);
      dim.forEach((dimension, n) => {
        if (dimension && dimension.length === 4) {
          draw(n, canvas, dimension);
        }
      });
    }
  }, [dim]);

  return (
    <canvas
      className="pdf_node_canvas"
      id={id}
      width={width}
      height={height}
      onMouseDown={(e) => {
        const element = e.target as Element;
        const x = element.getBoundingClientRect().x;
        const y = element.getBoundingClientRect().y;
        const X = e.clientX - x;
        const Y = e.clientY - y;
        setStart(true);
        setDim([...dim, [X, Y, X, Y]]);
      }}
      onMouseMove={(e) => {
        const element = e.target as Element;
        const x = element.getBoundingClientRect().x;
        const y = element.getBoundingClientRect().y;
        const X = e.clientX - x;
        const Y = e.clientY - y;
        const dimension = dim[dim.length - 1];
        let Dim = [...dim];
        if (start && dimension) {
          const newDimension: [x1, y1, x2, y2] = [
            dimension[0],
            dimension[1],
            X,
            Y,
          ];
          Dim[dim.length - 1] = newDimension;
          setDim([...Dim]);
        }
      }}
      onMouseUp={(e) => {
        setStart(false);
      }}
    ></canvas>
  );
};

export default Canvas;
