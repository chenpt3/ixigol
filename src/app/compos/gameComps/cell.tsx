import { useRef } from 'react';

interface CellProps {
    cellId: number;
    playMove: (row: number, col: number, drawMark: (mark: string) => void) => void;
    gameBoard: string[][];
}
  
const Cell = ({ cellId, playMove, gameBoard }: CellProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const translateCell = (cellId: number): number[] => {
    const x: number = Math.floor((cellId - 1) / 3); 
    const y: number = (cellId - 1) % 3;
    return [x, y];
  };

  const coords = translateCell(cellId);

  const drawX = (progress = 0, line = 1): void => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.strokeStyle = '#000000';
        context.lineWidth = 2;
        if (line === 1) {
          context.beginPath();
          if (progress < 1) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.moveTo(10, 10);
            context.lineTo(10 + 55 * progress, 10 + 55 * progress);
            context.stroke();  
            window.requestAnimationFrame(() => drawX(progress + 0.2, line));
          } else {
            drawX(0, 2);
          }
          context.closePath();
        } else if (line === 2) {
          context.beginPath();
          if (progress < 1) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.moveTo(10, 10);
            context.lineTo(65, 65);
            context.stroke();
            context.moveTo(65, 10);
            context.lineTo(65 - 55 * progress, 10 + 55 * progress);
            context.stroke();
            context.closePath();
            window.requestAnimationFrame(() => drawX(progress + 0.2, line));
          } else {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.moveTo(10, 10);
            context.lineTo(65, 65);
            context.stroke();
            context.moveTo(65, 10);
            context.lineTo(10, 65);
            context.stroke();
          }
          context.closePath();
        }
      }
    }
  }
  
  const drawO = (progress = 0): void => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.strokeStyle = '#000000';
        context.lineWidth = 2;
        context.beginPath();
        if (progress < 1) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.arc(75/2, 75/2, 75/2-7.5, 0, 2 * Math.PI * progress);
          context.stroke();
          window.requestAnimationFrame(() => drawO(progress + 0.1)); // Add this line
        }
        context.closePath();
      }
    }
  }

  const drawMark = (mark: string): void => {
    if (mark === 'X') {
      drawX();
    } else {
      drawO();
    }
  };

  return (
    <div id={`cell-${cellId}`} className="w-[75px] h-[75px] z-10" >
      <canvas ref={canvasRef} onClick={() => playMove(coords[0], coords[1], drawMark)} width="75px" height="75px" className="dark:invert shadow-2xl" id={`cell-canvas-${cellId}`}></canvas>
    </div>
  );
}

export default Cell;