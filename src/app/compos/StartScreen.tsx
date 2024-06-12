import React from "react";
import { useTranslation } from 'react-i18next';

interface StartScreenProps {
    onPlayerClick: () => void;
    onBotClick: () => void;
  }
  
  const StartScreen = React.memo(function StartScreen({ onPlayerClick, onBotClick }: StartScreenProps) {
    const { t } = useTranslation();
    return (
      <div className="flex flex-col md:justify-center items-center h-full gap-[30px] md:mt-[-30px] mt-[150px]">
        <button onClick={onPlayerClick} className={'bg-blue-500 text-white rounded-xl hover:bg-blue-700 w-[200px] h-[60px] transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow text-[1.2rem]'}>{t('Player VS Player')}</button>
        <button onClick={onBotClick} className={'bg-green-500 text-white rounded-xl hover:bg-green-700 w-[200px] h-[60px] transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow text-[1.2rem]'}>{t('Player VS Bot')}</button>
      </div>
    );
  });

  export default StartScreen;