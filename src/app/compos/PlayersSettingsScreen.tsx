import React, { useState, useCallback } from "react";
import { useTranslation } from 'react-i18next';

interface PlayersSettingsScreenProps {
    onPlayerPlay: (player1: string, player2: string) => void;
    onReturn: () => void;
  }
  
  const PlayersSettingsScreen = React.memo(function PlayersSettingsScreen({ onPlayerPlay, onReturn }: PlayersSettingsScreenProps) {
    const [player1, setPlayer1] = useState<string>('');
    const [player2, setPlayer2] = useState<string>('');
    const { t } = useTranslation();
  
    const handlePlayer1Change = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setPlayer1(event.target.value);
    }, []);
  
    const handlePlayer2Change = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setPlayer2(event.target.value);
    }, []);
  
    const handlePlayClick = useCallback((): void => {
      const player1Name = player1 !== '' ? player1 : 'Player 1';
      const player2Name = player2 !== '' ? player2 : 'Player 2';
      onPlayerPlay(player1Name, player2Name);
    }, [onPlayerPlay, player1, player2]);
  
    const handleReturnClick = useCallback((): void => {
      onReturn();
    }, [onReturn]);

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
          <input onBlur={handleBlur} onFocus={handleFocus} id="player1" type="text" placeholder={t('Player 1')} value={player1} onChange={handlePlayer1Change} className="px-4 py-2 border rounded-md text-black" />
          <label htmlFor="player2" className="text-lg font-bold">
          {t('Player 2 Name:')}
          </label>
          <input onBlur={handleBlur} onFocus={handleFocus} id="player2" type="text" placeholder={t('Player 2')} value={player2} onChange={handlePlayer2Change} className="px-4 py-2 border rounded-md text-black" />
        </div>
        <div className="flex gap-4">
          <button onClick={handlePlayClick} className="font-bold px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-700 transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow w-[100px]">{t('Play')}</button>
          <button onClick={handleReturnClick} className="font-bold px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-700 transition-all duration-500 ease-in-out shadow-dark-glow dark:shadow-white-glow w-[100px]">{t('Return')}</button>
        </div>
      </div>
    );
  });

  export default PlayersSettingsScreen;