import React, { useEffect, useState, useContext, useCallback } from "react";
import ThemeContext from "../themeContext";
import { useTranslation } from 'react-i18next';
import flagIl from "../../assets/flag-il.svg"
import flagUs from "../../assets/flag-us.svg"
import moon from "../../assets/moon.svg"
import sun from "../../assets/sun.svg"
import soundOn from "../../assets/sound-on.svg"
import soundOff from "../../assets/sound-off.svg"
import SoundContext from "../soundContext";

interface HeaderProps {
  didMount: boolean;
}

const Header = React.memo(function Header({ didMount }: HeaderProps) {
  const { t } = useTranslation();
  return (
    <div className="flex md:flex-col md:justify-center md:relative flex-row justify-between h-[60px]">
      <div className="text-left md:text-center text-[1.7rem] md:text-[2.3rem] md:mt-[-15px]">
        <p>{t('Tic Tac Toe')}</p>
      </div>
      <div className="md:absolute md:top-0 md:start-0 flex gap-[10px]">
        <LanguageToggle didMount={didMount} />
        <ThemeToggle didMount={didMount} />
        <SoundToggle didMount={didMount} />
      </div>
    </div>
  );
});

interface ThemeToggleProps {
  didMount: boolean;
}

const ThemeToggle = React.memo(function ThemeToggle({ didMount }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return (
    <img src={isDark ? moon : sun} alt="Theme" onClick={toggleTheme} className="w-10 h-10 dark:invert" />
  );
});

interface LanguageToggleProps {
  didMount: boolean;
}

const LanguageToggle = React.memo(function LanguageToggle({ didMount }: LanguageToggleProps) {
  const [isHebrew, setIsHebrew] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const { play } = useContext(SoundContext);

  const click = useCallback((): void => {
    const newLanguage = isHebrew ? 'en' : 'he';
    setIsHebrew(!isHebrew);
    if (newLanguage === 'he') document.body.style.direction = 'rtl';
    if (newLanguage === 'en') document.body.style.direction = 'ltr';
    i18n.changeLanguage(newLanguage);
    if (didMount) {
      play();
    }
  }, [isHebrew, i18n, play, didMount]);

  return (
    <img src={isHebrew ? flagIl : flagUs} alt="Language" onClick={click} className="w-10 h-10" />
  );
});

interface SoundToggleProps {
  didMount: boolean;
}

const SoundToggle = React.memo(function SoundToggle({ didMount }: SoundToggleProps) {
  const { isMuted, toggleMute, play } = useContext(SoundContext);
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    if (didMount && !isMuted && hasClicked) {
      play();
    }
  }, [didMount, isMuted, play, hasClicked]);

  const click = useCallback((): void => {
    toggleMute();
    setHasClicked(true);
  }, [toggleMute]);

  return (
    <img src={isMuted ? soundOff : soundOn} alt="Sound" onClick={click} className="w-10 h-10 dark:invert" />
  );
});

export default Header;