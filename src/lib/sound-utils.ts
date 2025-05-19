// Sound utility functions for the Tarot app
// This file provides functions to play sound effects

/**
 * Play a sound effect
 * @param soundPath Path to the sound file
 * @param volume Volume level (0-1)
 * @returns The Audio element that was created (can be used to stop playback if needed)
 */
export const playSound = (soundPath: string, volume = 0.5): HTMLAudioElement => {
  const audio = new Audio(soundPath);
  audio.volume = volume;

  // Play the sound (with error handling)
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.error('Error playing sound:', error);
    });
  }

  return audio;
};

// Sound paths
export const SOUNDS = {
  SHUFFLE: '/sounds/card-shuffle.mp3',
  CARD_FLIP: '/sounds/card-flip.mp3',
  CARD_PLACE: '/sounds/card-place.mp3',
};
