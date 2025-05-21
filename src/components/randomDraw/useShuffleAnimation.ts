export interface ShuffleAnimationConfig {
  totalCards: number;
  containerWidth: number;
  onUpdatePositions: (positions: { x: number; y: number; rotation: number }[]) => void;
  onUpdateOrientations: (orientations: boolean[]) => void;
  // onSetHighlightedIndexes: (indexes: number[]) => void;
  onSetHighlightedIndexes: (indexes: number[] | ((prev: number[]) => number[])) => void;

  onCompleteShuffling: () => void;
}

export function useShuffleAnimation() {
  const handleShuffleAnimation = ({
    totalCards,
    containerWidth,
    onUpdatePositions,
    onUpdateOrientations,
    onSetHighlightedIndexes,
    onCompleteShuffling,
  }: ShuffleAnimationConfig) => {
    // Play shuffle sound

    // Randomly determine which cards will end up upside down
    const newCardOrientations = Array.from({ length: totalCards }).map(
      () => Math.random() > 10 // approximately 50% of cards will be upside down
    );
    onUpdateOrientations(newCardOrientations);

    // Keep track of the current position of each card
    // This will make the swapping effect more visible
    let cardPositionsTracker = Array.from({ length: totalCards }).map((_, i) => i);

    // Scale factor to ensure cards stay in view on small screens
    const scaleFactor = Math.min(1, containerWidth / (totalCards * 100 + 100));

    // Calculate a safe spacing that works for small screens
    const safeSpacing = Math.min(60, (containerWidth / totalCards) * 0.6);

    // Define spacing for card positions based on total cards and container width
    const basePositions = Array.from({ length: totalCards }).map((_, i) => {
      // Calculate base position for card i (evenly spaced)
      const spacing = safeSpacing; // Responsive spacing between cards
      const offset = ((totalCards - 1) * spacing) / 2; // Center all cards
      return {
        index: i,
        baseX: i * spacing - offset,
        baseY: 0,
      };
    });

    // Phase 1: Quick gather cards together with minimal horizontal movement
    const gatherPositions = Array.from({ length: totalCards }).map((_, i) => ({
      x: basePositions[cardPositionsTracker[i]].baseX + (Math.random() * 10 - 5), // Minimal horizontal movement
      y: Math.random() * 10 - 5, // Very small Y offset
      rotation: Math.random() * 8 - 4, // Slight rotation
    }));

    onUpdatePositions(gatherPositions);

    // Phase 2: First visible card swap - emphasize vertical movement instead of horizontal
    setTimeout(() => {
      // Shuffle the card positions
      cardPositionsTracker = cardPositionsTracker.sort(() => Math.random() - 0.5);

      const firstSwapPositions = Array.from({ length: totalCards }).map((_, i) => {
        // Card i moves to the position of cardPositionsTracker[i]
        const newPosition = basePositions[cardPositionsTracker[i]];

        // Start adding some more dramatic rotation
        const shouldRotateMore = Math.random() > 0.7; // 30% of cards get more rotation

        return {
          x: newPosition.baseX * 0.8, // Reduce horizontal spread
          y: (Math.random() * 40 - 20) * scaleFactor, // More vertical movement, scaled for small screens
          rotation: shouldRotateMore
            ? Math.random() * 180 - 90 // More dramatic rotation for some cards
            : (Math.random() * 20 - 10) * (i % 2 === 0 ? 1 : -1), // Alternating rotation for others
        };
      });

      onUpdatePositions(firstSwapPositions);

      // Phase 3: Second visible card swap with more pronounced vertical movement
      setTimeout(() => {
        // Shuffle the card positions again
        cardPositionsTracker = cardPositionsTracker.sort(() => Math.random() - 0.5);

        // Create clear, visible positions that show card swapping
        const secondSwapPositions = Array.from({ length: totalCards }).map((_, i) => {
          const newPosition = basePositions[cardPositionsTracker[i]];
          const shouldRotateFullCircle = Math.random() > 0.6; // 40% of cards get full rotation

          return {
            x: newPosition.baseX * 0.8, // Reduce horizontal spread
            y: (i % 2 === 0 ? 30 : -30) * scaleFactor, // Alternating high/low positions, scaled
            rotation: shouldRotateFullCircle
              ? Math.random() > 0.5
                ? 360
                : -360 // Full rotation clockwise or counter-clockwise
              : Math.random() * 40 - 20, // Moderate rotation for other cards
          };
        });

        onUpdatePositions(secondSwapPositions);

        // Phase 4: Third clear swap with more rotation than movement
        setTimeout(() => {
          // Shuffle one more time
          cardPositionsTracker = cardPositionsTracker.sort(() => Math.random() - 0.5);

          const thirdSwapPositions = Array.from({ length: totalCards }).map((_, i) => {
            const newPosition = basePositions[cardPositionsTracker[i]];
            const shouldSpinMultipleTimes = Math.random() > 0.7; // 30% of cards get multiple spins

            // Use rotation more than position for visual effect
            return {
              x: newPosition.baseX * 0.9, // Keep horizontal spread minimal
              y: (Math.random() * 40 - 20) * scaleFactor, // Moderate vertical offset, scaled
              rotation: shouldSpinMultipleTimes
                ? Math.random() > 0.5
                  ? 720
                  : -720 // Some cards spin 2 full rotations
                : Math.random() * 180 - 90, // Others get varied rotation
            };
          });

          onUpdatePositions(thirdSwapPositions);

          // Phase 5: Final swap
          setTimeout(() => {
            // Final shuffle
            cardPositionsTracker = cardPositionsTracker.sort(() => Math.random() - 0.5);

            const finalSwapPositions = Array.from({ length: totalCards }).map((_, i) => {
              const newPosition = basePositions[cardPositionsTracker[i]];

              // Start preparing for the final orientation by setting up rotations
              // that will align or flip the cards as needed
              return {
                x: newPosition.baseX * 0.7, // Reduced horizontal movement
                y: Math.random() * 20 - 10, // Less vertical offset
                rotation: (newCardOrientations[i] ? 160 : 20) + (Math.random() * 40 - 20), // Prepare for final orientation with some variation
              };
            });

            onUpdatePositions(finalSwapPositions);

            // Phase 6: Return to normal positions with a gentle alignment
            setTimeout(() => {
              // Set final positions based on whether cards are upright or reversed
              const finalPositions = Array.from({ length: totalCards }).map((_, i) => {
                // Add a very small random offset to make it look more natural
                const smallRandomX = Math.random() * 4 - 2; // Small X adjustment (-2 to 2 pixels)
                const smallRandomY = Math.random() * 4 - 2; // Small Y adjustment (-2 to 2 pixels)

                return {
                  x: smallRandomX,
                  y: smallRandomY,
                  rotation: newCardOrientations[i] ? 180 : 0, // Cards end up upside down or upright
                };
              });

              // Apply the final positioning smoothly
              onUpdatePositions(finalPositions);

              // Delay the rest of the completion logic to allow smooth animation
              setTimeout(() => {
                // Create a ripple effect of highlighted cards
                // Cards will highlight from the center outward
                const centerCardIndex = Math.floor(totalCards / 2);

                // Calculate distance from center for each card
                // This will be used to determine highlight timing
                const cardDistances = Array.from({ length: totalCards })
                  .map((_, index) => {
                    return {
                      index,
                      distance: Math.abs(index - centerCardIndex),
                    };
                  })
                  .sort((a, b) => a.distance - b.distance);

                // Highlight cards in waves from center outward
                cardDistances.forEach(({ index }, i) => {
                  // Highlight this card after a delay based on its distance from center
                  setTimeout(() => {
                    onSetHighlightedIndexes(prev => [...prev, index]);

                    // Play a soft click sound for each card (varied pitch)

                    // Remove highlight after a delay
                    setTimeout(() => {
                      onSetHighlightedIndexes(prev => prev.filter(idx => idx !== index));
                    }, 300);
                  }, i * 10); // Increasing delay for cards further from center
                });

                onCompleteShuffling();
              }, 300); // Allow time for the smooth animation
            }, 400);
          }, 350);
        }, 350);
      }, 350);
    }, 300);
  };

  return { handleShuffleAnimation };
}
