import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Board, Return, PlayAgain } from './GameScreenCompos';

interface GameScreenProps {
  onReturn: () => void;
  settings: string[];
}

const GameScreen = React.memo(function GameScreen({ onReturn: onReturnProp, settings }: GameScreenProps) {
  const { t } = useTranslation();
  const isRtl = document.body.style.direction;
  const player1 = settings[0];
  const player2 = settings[1];
  const diff = settings[2];
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);
  const [activePlayer, setActivePlayer] = useState<string>(player1);
  const [winner, setWinner] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<string>(t('it{{nextPlayer}}turn', { nextPlayer: activePlayer }));
  const initializeGameBoard = (): string[][] => [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  const [gameBoard, setGameBoard] = useState<string[][]>(initializeGameBoard);

  const playAgain = () => {
    setGameBoard(initializeGameBoard);
    setWinner('');
    setGameOver(false);
    if (winner) {
      setActivePlayer(winner);
      setGameStatus(`It's ${winner}'s turn!`);
    } else {
      setActivePlayer(player1);
      setGameStatus(`It's ${player1}'s turn!`);
    }
  
    for (let i = 1; i <= 9; i++) {
      const canvas = document.getElementById(`cell-canvas-${i}`);
      if (canvas instanceof HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  };

  const checkWinner = (board: string[][]): string => {
    const lines = [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]]
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (a && a === b && a === c) {
        return a;
      }
    }
  
    return '';
  }
  
  const isBoardFull = (board: string[][]): boolean => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === '') {
          return false;
        }
      }
    }
  
    return true;
  }

  const playMove = (row: number, col: number, drawMark: (mark: string) => void) => {
    if (gameBoard[row][col] === '' && !gameOver) {
      const newGameBoard = [...gameBoard];
      newGameBoard[row][col] = activePlayer === player1 ? 'X' : 'O';
      setGameBoard(newGameBoard);
      drawMark(newGameBoard[row][col]);
      const nextPlayer = activePlayer === player1 ? player2 : player1;
      
      const winnerMark = checkWinner(newGameBoard);
      let isGameOver = false;
      let winner = '';
      if (winnerMark) {
        winner = winnerMark === 'X' ? player1 : player2;
        setWinner(winner);
        setGameOver(true);
        isGameOver = true;
        if (winner === player1) {
          setPlayer1Score(player1Score + 1);
        } else {
          setPlayer2Score(player2Score + 1);
        }
      } else if (isBoardFull(newGameBoard)) {
        setGameOver(true);
        isGameOver = true;
      }
      if (isGameOver && winner) {
        setActivePlayer(winner);
      } else {
        setActivePlayer(nextPlayer);
      }
    }
  };

  const onReturn = () => {
    onReturnProp();
  }; 

  const handleStatus = (nextPlayer: string, isGameOver: boolean, winner: string): void => {
    if (isGameOver) {
      if (winner) {
        setGameStatus(t('{{winner}}Won!', { winner: winner }))
      } else {
        setGameStatus(t('draw'));
      }
    } else {
      setGameStatus(t('it{{nextPlayer}}turn', { nextPlayer: nextPlayer }))
    }
  }

  useEffect(() => {
    handleStatus(activePlayer, gameOver, winner);
  }, [activePlayer, gameOver, winner, t]);

  return (
    <div className="flex flex-col gap-3 h-full w-full
                    items-center
                    ">
      <div className="flex justify-between align-center">
        <p className="text-2xl font-bold text-sky-950 dark:text-sky-300 text-shadow-black dark:text-shadow-white">{t(gameStatus)}</p>
      </div>
      <Board gameBoard={gameBoard} playMove={playMove} />
      <div className="grid">
        {gameOver ? <PlayAgain onReturn={onReturn} onPlayAgain={playAgain} /> : <Controls onReturn={onReturn} player1={player1} player2={player2} player1Score={player1Score} player2Score={player2Score} t={t} />}
      </div>
    </div>
  );
});

interface ControlsProps {
  onReturn: () => void;
  player1: string;
  player2: string;
  player1Score: number;
  player2Score: number;
  t: (key: string, args?: any) => string;

}

const Controls = ({ onReturn, player1, player2, player1Score, player2Score, t }: ControlsProps) => {
  return (
    <div className="grid grid-cols-2
                    md:flex md:flex-row md:gap-5
                    ">
      <div className='flex flex-col justify-center items-center order-1 md:order-1 px-5'>
        <p className="text-[1.3rem] font-semibold text-rose-950 dark:text-amber-200 text-shadow-black dark:text-shadow-white">{t('score')}</p>
        <p className="text-2xl font-bold text-black dark:text-white text-shadow text-shadow-black dark:text-shadow-white">{player1} - {player1Score}</p> 
      </div>
      <div className='flex flex-col justify-center items-center order-2 md:order-3 px-5'>
        <p className="text-[1.3rem] font-semibold text-rose-950 dark:text-amber-200 text-shadow-white dark:text-shadow-black">{t('score')}</p>
        <p className="text-2xl font-bold text-black dark:text-white text-shadow text-shadow-black dark:text-shadow-white">{player2} - {player2Score}</p>        
      </div>
      <Return onReturn={onReturn} />
    </div>
  );
}


export default GameScreen;