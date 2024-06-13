import React, { FC, useMemo, useState, useEffect, useCallback } from 'react';
import i18n from './lang/lang';
import Header from './compos/Header';
import StartScreen from './compos/StartScreen';
import PlayersSettingsScreen from './compos/PlayersSettingsScreen';
import BotSettingsScreen from './compos/BotSettingsScreen';
import GameScreen from './compos/GameScreen';
import ThemeContext from './hooks/themeContext';
import SoundContext from './hooks/soundContext';
import useAppSound from './hooks/useAppSound';

enum Screen {
  Start = 'start',
  Player = 'player',
  Bot = 'bot',
  Game = 'game',
}

enum PlayerNames {
  Player1 = 'Player 1',
  Player2 = 'Player 2',
  Bot = 'Bot',
}

const App: FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.Start);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [player1Name, setPlayer1Name] = useState<string>(PlayerNames.Player1);
  const [player2Name, setPlayer2Name] = useState<string>(PlayerNames.Player2);
  const [botDiff, setBotDiff] = useState<string>('');
  const [didMount, setDidMount] = useState(false);
  const { isMuted, toggleMute, play } = useAppSound();
  const settings = useMemo(() => [player1Name, player2Name, botDiff], [player1Name, player2Name, botDiff]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  const toggleTheme = useCallback((): void => {
    setIsDark(!isDark);
    document.querySelector("html")?.classList.toggle("dark");
    if (didMount) {
      play();
    }
  }, [isDark, play, didMount]);
  
  const handlePlayerClick = useCallback((): void => {
    setScreen(Screen.Player);
    if (didMount) {
      play();
    }
  }, [play, didMount]);

  const handleBotClick = useCallback((): void => {
    setScreen(Screen.Bot)
    if (didMount) {
      play();
    }
  }, [play, didMount]);

  const onPlayerPlay = useCallback((player1: string, player2: string): void => {
    setPlayer1Name(player1);
    setPlayer2Name(player2);
    setScreen(Screen.Game);
    if (didMount) {
      play();
    }
  }, [play, didMount]);

  const onBotPlay = useCallback((player1: string, botDiff: string): void => {
    setPlayer1Name(player1);
    setPlayer2Name(PlayerNames.Bot);
    setBotDiff(botDiff);
    setScreen(Screen.Game);
    if (didMount) {
      play();
    }
  }, [play, didMount]);

  const onReturn = useCallback((): void => {
    setScreen(Screen.Start);
    if (didMount) {
      play();
    }
  }, [play, didMount]);

  useEffect(() => {
    i18n.init().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <React.StrictMode>
      <SoundContext.Provider value={{ isMuted, toggleMute, play }}>
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
          <div className="flex flex-col w-full h-full p-2 sm:p-5 md:w-11/12 md:h-5/6 md:rounded-2xl bg-sky-300 md:bg-opacity-10 bg-opacity-0 md:shadow-dark-glow text-black dark:bg-indigo-500 dark:text-white md:dark:bg-opacity-10 md:dark:shadow-white-glow dark:bg-opacity-0 transition-colors duration-500 ease-in-out">
            <Header didMount={didMount} />
            <div className="w-full h-full">
              {screen === Screen.Start && <StartScreen onPlayerClick={handlePlayerClick} onBotClick={handleBotClick} />}
              {screen === Screen.Player && <PlayersSettingsScreen onPlayerPlay={onPlayerPlay} onReturn={onReturn} />}
              {screen === Screen.Bot && <BotSettingsScreen onBotPlay={onBotPlay} onReturn={onReturn} />}
              {screen === Screen.Game && <GameScreen didMount={didMount} onReturn={onReturn} settings={settings} />}
            </div>
          </div>
        </ThemeContext.Provider>
      </SoundContext.Provider>
    </React.StrictMode>
  )
}

export default App;