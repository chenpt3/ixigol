import { useState, useCallback } from 'react';
import useSound from 'use-sound';
import click from '../assets/sounds/click.mp3';

function useAppSound() {
  const [isMuted, setIsMuted] = useState<boolean>(() => localStorage.getItem('mute') === 'true');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => localStorage.getItem('mute') !== 'true');
  const [play] = useSound(click, { volume: 0.25, soundEnabled });

  const toggleMute = useCallback(() => {
    const newMuteState = !isMuted;
    localStorage.setItem('mute', newMuteState.toString());
    setSoundEnabled(!newMuteState);
    setIsMuted(newMuteState);
  }, [isMuted]);

  return { isMuted, toggleMute, play };
}

export default useAppSound;