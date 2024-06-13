import { useState, useCallback } from 'react';
import useSound from 'use-sound';
import click from '../assets/sounds/click.mp3';
import x from '../assets/sounds/x.mp3';
import o from '../assets/sounds/o.mp3';

function useAppSound() {
  const [isMuted, setIsMuted] = useState<boolean>(() => localStorage.getItem('mute') === 'true');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => localStorage.getItem('mute') !== 'true');
  const [play] = useSound(click, { volume: 0.3, soundEnabled, playbackRate: 1.3});
  const [playX] = useSound(x, { volume: 0.6, soundEnabled, playbackRate: 2.5});
  const [playO] = useSound(o, { volume: 0.6, soundEnabled, playbackRate: 3 });

  const toggleMute = useCallback(() => {
    const newMuteState = !isMuted;
    localStorage.setItem('mute', newMuteState.toString());
    setSoundEnabled(!newMuteState);
    setIsMuted(newMuteState);
  }, [isMuted]);

  return { isMuted, toggleMute, play, playX, playO};
}

export default useAppSound;