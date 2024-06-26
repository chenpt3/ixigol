import React, { useState, useCallback } from "react";
import { useTranslation } from 'react-i18next';

interface BotSettingsScreenProps {
    onBotPlay: (player1: string, botDiff: string) => void;
    onReturn: () => void;
}
  
  const BotSettingsScreen = React.memo(function BotSettingsScreen({ onBotPlay, onReturn }: BotSettingsScreenProps) {
    const [player1, setPlayer1] = useState<string>('');
    const [botDiff, setBotDiff] = useState<string>('normal');
    const { t } = useTranslation();
  
    const handlePlayer1Change = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setPlayer1(event.target.value);
    }, []);
  
    const handleBotDiffChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
      setBotDiff(event.target.value);
    }, []);
  
    const handlePlayClick = useCallback((): void => {
      onBotPlay(player1, botDiff);
    }, [onBotPlay, player1, botDiff]);
  
    const handleReturnClick = useCallback((): void => {
      onReturn();
    }, []);

    const handleFocus = useCallback(() => {
      document.body.style.height = `${window.innerHeight}px`;
      document.body.style.position = 'fixed';
    }, []);
    
    const handleBlur = useCallback(() => {
      document.body.style.height = 'auto';
      document.body.style.position = 'static';
    }, []);
  
    return (
      <div className="flex flex-col gap-5 h-full
                      md:justify-center mt-[50px] sm:mt-[100px] md:mt-[0] items-center
                      ">
        <div className="flex flex-col gap-5">
          <label htmlFor="player1" className="text-lg font-bold">
            {t('Player 1 Name:')}
          </label>
          <input onBlur={handleBlur} onFocus={handleFocus} id="player1" type="text" placeholder={t("Player 1")} value={player1} onChange={handlePlayer1Change} className="px-4 py-2 border rounded-md text-black" />
          <label htmlFor="bot" className="text-lg font-bold">
            {t('Choose Bot Difficulty:')}
          </label>
          <select onChange={handleBotDiffChange} id="bot" value={botDiff} className="px-4 py-2 border rounded-md text-black">
            <option value="easy">{t('Easy')}</option>
            <option value="normal">{t('Normal')}</option>
            <option value="hard">{t('Hard')}</option>
            <option value="impossible">{t('Impossible')}</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button onClick={handlePlayClick} className="font-bold px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-700 transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow w-[100px]">{t('Play')}</button>
          <button onClick={handleReturnClick} className="font-bold px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-700 transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow w-[100px]">{t('Return')}</button>
        </div>
      </div>
    );
  });

  export default BotSettingsScreen;