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
                      md:justify-center mt-[50px] sm:mt-[200px] md:mt-[0] items-center
                      ">
        <button onClick={onPlayerClick} className={'font-bold bg-sky-500 text-white rounded hover:bg-sky-700 w-[200px] h-[60px] transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow text-xl'}>{t('Player VS Player')}</button>
        <button className={'font-bold bg-violet-500 text-white rounded hover:bg-violet-700 w-[200px] h-[60px] transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow text-xl'}>{t('Player VS Bot')}</button>
      </div>
    );
  });

  export default StartScreen;