import { useState, useCallback } from 'react';
import useSound from 'use-sound';
import click from '../assets/sounds/click.mp3';

function useAppSound() {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [play] = useSound(click, { volume: 0.25, soundEnabled });

  const toggleMute = useCallback(() => {
    setSoundEnabled(prevState => !prevState);
    setIsMuted(prevState => !prevState);
  }, []);

  return { isMuted, toggleMute, play };
}

export default useAppSound;