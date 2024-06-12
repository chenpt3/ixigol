import React from "react";
import { useTranslation } from 'react-i18next';

interface StartScreenProps {
    onPlayerClick: () => void;
    onBotClick: () => void;
  }
  
  const StartScreen = React.memo(function StartScreen({ onPlayerClick, onBotClick }: StartScreenProps) {
    const { t } = useTranslation();
    return (
      <div className="flex flex-col gap-5 h-full
                      justify-center items-center
                      ">
        <button onClick={onPlayerClick} className={'bg-sky-500 text-white rounded-xl hover:bg-sky-700 w-[200px] h-[60px] transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow text-xl'}>{t('Player VS Player')}</button>
        <button onClick={onBotClick} className={'bg-violet-500 text-white rounded-xl hover:bg-violet-700 w-[200px] h-[60px] transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow text-xl'}>{t('Player VS Bot')}</button>
      </div>
    );
  });

  export default StartScreen;