import { FC, memo } from "react";
import { useTranslation } from 'react-i18next';
import LanguageToggle from "./headerComps/langToggle";
import ThemeToggle from "./headerComps/themeToggle";
import SoundToggle from "./headerComps/soundToggle";

interface HeaderProps {
  didMount: boolean;
}

const Header: FC<HeaderProps> = memo(({ didMount }) => {
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

export default Header;