import { useState, useCallback, useEffect } from "react";
import Header from './compos/Header';
import StartScreen from './compos/StartScreen';
import PlayersSettingsScreen from './compos/PlayersSettingsScreen';
import BotSettingsScreen from './compos/BotSettingsScreen';
import GameScreen from "./compos/GameScreen";
import i18n from "./lang";
import ThemeContext from "./themeContext";
import SoundContext from "./soundContext";
import useSound from 'use-sound';
import click1 from '../assets/click.mp3';

export default function App() {
  const [screen, setScreen] = useState<string>('start');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [player1Name, setPlayer1Name] = useState<string>('Player 1');
  const [player2Name, setPlayer2Name] = useState<string>('Player 2');
  const [botDiff, setBotDiff] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [play] = useSound(click1, { volume: 0.25, soundEnabled });
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);
  
  const toggleMute = useCallback(() => {
    setSoundEnabled(prevState => !prevState);
    setIsMuted(prevState => !prevState);
  }, []);

  const toggleTheme = useCallback((): void => {
    setIsDark(!isDark);
    document.querySelector("html")?.classList.toggle("dark");
    if (didMount) {
      play();
    }
  }, [isDark, play, didMount]);
  
  const handlePlayerClick = useCallback((): void => {
    setScreen('player');
    if (didMount) {
      play();
    }
  }, [play, didMount]);

  const handleBotClick = useCallback((): void => {
    setScreen('bot')
    if (didMount) {
      play();
    }
  }, [play, didMount]);

  const onPlayerPlay = useCallback((player1: string, player2: string): void => {
    setPlayer1Name(player1);
    setPlayer2Name(player2);
    setScreen('game');
    if (didMount) {
      play();
    }
  }, [play, didMount]);

  const onBotPlay = useCallback((player1: string, botDiff: string): void => {
    setPlayer1Name(player1);
    setPlayer2Name("Bot");
    setBotDiff(botDiff);
    setScreen('game');
    if (didMount) {
      play();
    }
  }, [play, didMount]);

  const onReturn = useCallback((): void => {
    setScreen('start');
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
    <SoundContext.Provider value={{ isMuted, toggleMute, play }}>
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <div className="flex flex-col
                      w-[100vw] h-[100svh] p-2 sm:p-5
                      md:w-11/12 md:h-5/6 md:rounded-2xl
                      bg-sky-300 md:bg-opacity-10 bg-opacity-0 md:shadow-dark-glow text-black
                      dark:bg-indigo-500 dark:text-white md:dark:bg-opacity-10 md:dark:shadow-white-glow dark:bg-opacity-0
                      transition-colors duration-500 ease-in-out
                      ">
          <Header didMount={didMount} />
          <div className="w-full h-full">
            {screen === 'start' && <StartScreen onPlayerClick={handlePlayerClick} onBotClick={handleBotClick} />}
            {screen === 'player' && <PlayersSettingsScreen onPlayerPlay={onPlayerPlay} onReturn={onReturn} />}
            {screen === 'bot' && <BotSettingsScreen onBotPlay={onBotPlay} onReturn={onReturn} />}
            {screen === 'game' && <GameScreen didMount={didMount} onReturn={onReturn} settings={[player1Name, player2Name, botDiff]} />}
          </div>
        </div>
      </ThemeContext.Provider>
    </SoundContext.Provider>
  )
}