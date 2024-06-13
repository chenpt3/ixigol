import Return from './return';

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

export default Controls;