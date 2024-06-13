import Cell from './cell';

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

export default Row;