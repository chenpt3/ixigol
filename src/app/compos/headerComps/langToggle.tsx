import { FC, memo, useState, useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SoundContext from '../../hooks/soundContext';
import flagIl from '../../assets/images/flag-il.svg';
import flagUs from '../../assets/images/flag-us.svg';

interface LanguageToggleProps {
    didMount: boolean;
}

const LanguageToggle: FC<LanguageToggleProps> = memo(({ didMount }) => {
    const { i18n } = useTranslation();
    const { play } = useContext(SoundContext);

    const [isHebrew, setIsHebrew] = useState<boolean>(() => {
        const lang = localStorage.getItem('lang');
        return lang === 'he';
    });

    useEffect(() => {
        const lang = isHebrew ? 'he' : 'en';
        if (lang === 'he') {
            document.body.style.direction = 'rtl'
        } else {
            document.body.style.direction = 'ltr';
        }
        i18n.changeLanguage(lang);
    }, [isHebrew, i18n]);

    const click = useCallback((): void => {
        const newLanguage = isHebrew ? 'en' : 'he';
        setIsHebrew(!isHebrew);
        localStorage.setItem('lang', newLanguage);
        if (didMount) {
            play();
        }
    }, [isHebrew, play, didMount]);

    return (
        <img src={isHebrew ? flagIl : flagUs} alt="Language" onClick={click} className="w-10 h-10" />
    );
});

export default LanguageToggle;