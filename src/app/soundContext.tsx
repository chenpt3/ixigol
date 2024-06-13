import React from 'react';

const SoundContext = React.createContext({
    isMuted: false,
    toggleMute: () => {},
    play: () => {}
});

export default SoundContext