import React, { useState, useCallback, useEffect } from "react";
import Header from './compos/Header';
import StartScreen from './compos/StartScreen';
import PlayersSettingsScreen from './compos/PlayersSettingsScreen';
import BotSettingsScreen from './compos/BotSettingsScreen';
import GameScreen from "./compos/GameScreen";
import i18n from "./lang";
import ThemeContext from "./themeContext";

export default function App() {
  const [screen, setScreen] = useState<string>('start');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [player1Name, setPlayer1Name] = useState<string>('Player 1');
  const [player2Name, setPlayer2Name] = useState<string>('Player 2');
  const [botDiff, setBotDiff] = useState<string>('');

  const toggleTheme = useCallback((): void => {
    setIsDark(!isDark);
    document.querySelector("html")?.classList.toggle("dark");
  }, [isDark]);
  
  const handlePlayerClick = useCallback((): void => {

    setScreen('player');
  }, []);

  const handleBotClick = useCallback((): void => {
    setScreen('bot');
  }, []);

  const onPlayerPlay = useCallback((player1: string, player2: string): void => {
    setPlayer1Name(player1);
    setPlayer2Name(player2);
    setScreen('game');
  }, []);

  const onBotPlay = useCallback((player1: string, botDiff: string): void => {
    setPlayer1Name(player1);
    setPlayer2Name("Bot");
    setBotDiff(botDiff);
    setScreen('game');
  }, []);

  const onReturn = useCallback((): void => {
    setScreen('start');
  }, []);

  useEffect(() => {
    i18n.init().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className="md:min-h-3/4 md:w-11/12 md:h-5/6 bg-blue-500 dark:bg-indigo-500 dark:bg-opacity-30 bg-opacity-30 md:gap-5 md:flex md:flex-col text-black dark:text-white md:rounded-2xl p-5 shadow-dark-glow dark:shadow-white-glow w-full h-full">
        <Header />
        <div className="h-full">
          {screen === 'start' && <StartScreen onPlayerClick={handlePlayerClick} onBotClick={handleBotClick} />}
          {screen === 'player' && <PlayersSettingsScreen onPlayerPlay={onPlayerPlay} onReturn={onReturn} />}
          {screen === 'bot' && <BotSettingsScreen onBotPlay={onBotPlay} onReturn={onReturn} />}
          {screen === 'game' && <GameScreen onReturn={onReturn} settings={[player1Name, player2Name, botDiff]} />}
        </div>
      </div>
    </ThemeContext.Provider>
  )
}