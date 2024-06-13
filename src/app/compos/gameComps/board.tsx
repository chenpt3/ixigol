import { useEffect, useRef } from 'react';
import Row from './row';

interface BoardProps {
    playMove: (row: number, col: number, drawMark: (mark: string) => void) => void
    gameBoard: string[][];
}
  
const Board = ({ playMove, gameBoard }: BoardProps) => {
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

export default Board;