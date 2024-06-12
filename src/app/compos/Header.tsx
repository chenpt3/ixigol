import React, { useState, useContext, useCallback } from "react";
import ThemeContext from "../themeContext";
import { useTranslation } from 'react-i18next';
import flagIl from "../../assets/flag-il.svg"
import flagUs from "../../assets/flag-us.svg"
import moon from "../../assets/moon.svg"
import sun from "../../assets/sun.svg"
import soundOn from "../../assets/sound-on.svg"
import soundOff from "../../assets/sound-off.svg"

const Header = React.memo(function Header() {
    const { t } = useTranslation();
    return (
      <div className="flex md:flex-col md:justify-center md:relative flex-row justify-between h-[60px]">
        <div className="text-left md:text-center text-[1.7rem] md:text-[2.3rem] md:mt-[-15px]">
          <p>{t('Tic Tac Toe')}</p>
        </div>
        <div className="md:absolute md:top-0 md:start-0 flex gap-[10px]">
          <LanguageToggle />
          <ThemeToggle />
          <SoundToggle />
        </div>
      </div>
    );
  });
  
  const ThemeToggle = React.memo(function ThemeToggle() {
    const { isDark, toggleTheme } = useContext(ThemeContext);
  
    return (
      <img src={isDark ? moon : sun} alt="Theme" onClick={toggleTheme} className="w-10 h-10 dark:invert" />
    );
  });
  
  const LanguageToggle = React.memo(function LanguageToggle() {
    const [isHebrew, setIsHebrew] = useState<boolean>(false);
    const { i18n } = useTranslation();
  
    const click = useCallback((): void => {
      const newLanguage = isHebrew ? 'en' : 'he';
      setIsHebrew(!isHebrew);
      if (newLanguage === 'he') document.body.style.direction = 'rtl';
      if (newLanguage === 'en') document.body.style.direction = 'ltr';
      i18n.changeLanguage(newLanguage);
    }, [isHebrew, i18n]);
  
    return (
      <img src={isHebrew ? flagIl : flagUs} alt="Language" onClick={click} className="w-10 h-10" />
    );
  })
  
  const SoundToggle = React.memo(function SoundToggle() {
    const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
    const click = useCallback((): void => {
      setIsSoundOn(!isSoundOn);
    }, []);
    return (
      <img src={isSoundOn ? soundOn : soundOff} alt="Sound" onClick={click} className="w-10 h-10 dark:invert" />
    );
  });

  export default Header;