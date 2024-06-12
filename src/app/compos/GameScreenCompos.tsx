import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface CellProps {
    cellId: number;
    playMove: (row: number, col: number, drawMark: (mark: string) => void) => void;
    gameBoard: string[][];
  }
  
  function Cell({ cellId, playMove, gameBoard }: CellProps) {
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
  
  interface ReturnProps {
    onReturn: () => void;
  }
  
  function Return({ onReturn }: ReturnProps) {
    const { t } = useTranslation();
    return (
      <div className="mb-4 flex flex-col justify-center align-center p-8">
        <button onClick={onReturn} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow w-[100px]">{t('return')}</button>
      </div>
    );
  }
  
  interface PlayAgainProps {
    onPlayAgain: () => void;
    onReturn: () => void;
  }
  
  function PlayAgain({ onPlayAgain, onReturn }: PlayAgainProps) {
    const { t } = useTranslation();
    return (
      <div className="flex flex-col items-center">
        <p className="mb-2 text-lg font-bold">{t('playAgain')}</p>
        <div className="w-[200px] flex gap-[10px] justify-center align-center">
          <button onClick={onPlayAgain} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow w-[80px]">{t('yes')}</button>
          <button onClick={onReturn} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow w-[80px]">{t('no')}</button>
        </div>
      </div>
    );
  }
  
  interface BoardProps {
    playMove: (row: number, col: number, drawMark: (mark: string) => void) => void
    gameBoard: string[][];
  }
  
  function Board({ playMove, gameBoard }: BoardProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas !== null) {
        const context = canvas.getContext('2d');
        if (context !== null) {
          context.strokeStyle = '#000000';
          context.beginPath();
  
          context.moveTo(75, 0);
          context.lineTo(75, 225);
          context.stroke();
  
          context.moveTo(150, 0);
          context.lineTo(150, 225);
          context.stroke();
  
          context.moveTo(0, 75);
          context.lineTo(225, 75);
          context.stroke();
  
          context.moveTo(0, 150);
          context.lineTo(225, 150);
          context.stroke();
  
          context.closePath();
        }
      }
    }, []);
  
    return (
      <div className="relative">
        <canvas ref={canvasRef} id="myCanvas" width="225px" height="225px" className="absolute z-0 dark:invert">
        </canvas>
        <div>
          <Row gameBoard={gameBoard} playMove={playMove} rowId={0} />
          <Row gameBoard={gameBoard} playMove={playMove} rowId={3} />
          <Row gameBoard={gameBoard} playMove={playMove} rowId={6} />
        </div>
      </div>
    );
  }
  
  interface RowProps {
    rowId: number;
    playMove: (row: number, col: number, drawMark: (mark: string) => void) => void;
    gameBoard: string[][];
  }
  
  function Row({ rowId, playMove, gameBoard }: RowProps) {
    return (
      <div className="flex">
        <Cell gameBoard={gameBoard} playMove={playMove} cellId={1+rowId} />
        <Cell gameBoard={gameBoard} playMove={playMove} cellId={2+rowId} />
        <Cell gameBoard={gameBoard} playMove={playMove} cellId={3+rowId} />
      </div>
    );
  }

  export { Board, Return, PlayAgain };