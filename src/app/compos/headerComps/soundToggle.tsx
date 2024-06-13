import { FC, memo, useContext, useEffect, useState, useCallback } from 'react';
import SoundContext from '../../hooks/soundContext';
import soundOn from '../../assets/images/sound-on.svg';
import soundOff from '../../assets/images/sound-off.svg';

interface SoundToggleProps {
    didMount: boolean;
}
  
const SoundToggle: FC<SoundToggleProps> = memo(({ didMount }) => {
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

export default SoundToggle;