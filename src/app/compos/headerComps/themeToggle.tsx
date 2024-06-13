import { FC, memo, useContext } from 'react';
import moon from '../../assets/images/moon.svg';
import sun from '../../assets/images/sun.svg';
import ThemeContext from '../../hooks/themeContext';

interface ThemeToggleProps {
    didMount: boolean;
}
  
const ThemeToggle: FC<ThemeToggleProps> = memo(({ didMount }) => {
    const { isDark, toggleTheme } = useContext(ThemeContext);
    return (
      <img src={isDark ? moon : sun} alt="Theme" onClick={toggleTheme} className="w-10 h-10 dark:invert" />
    );
});

export default ThemeToggle;