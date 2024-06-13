import { useTranslation } from 'react-i18next';

interface PlayAgainProps {
    onPlayAgain: () => void;
    onReturn: () => void;
}
  
function PlayAgain({ onPlayAgain, onReturn }: PlayAgainProps) {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col justify-center items-center mt-[15px] gap-3">
        <p className="text-xl font-bold text-black dark:text-white">{t('playAgain')}</p>
        <div className="w-[200px] flex gap-[10px] justify-center align-center">
            <button onClick={onPlayAgain} className="font-bold px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow w-[80px]">{t('yes')}</button>
            <button onClick={onReturn} className="font-bold px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow w-[80px]">{t('no')}</button>
        </div>
        </div>
    );
}

export default PlayAgain;