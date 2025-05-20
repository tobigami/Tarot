import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/**
 * Hook to calculate placeholder positions for cards to move to
 */
export function usePlaceholderPositions(
  showCardSelection: boolean,
  cardCount: number,
  cardWidth: number,
  containerRef: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) {
  const placeholderRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [placeholderPositions, setPlaceholderPositions] = useState<{ x: number; y: number }[]>([]);

  // Initialize placeholder refs array when card count changes
  useEffect(() => {
    placeholderRefs.current = Array(cardCount).fill(null);
  }, [cardCount]);

  // Update placeholder positions when they change
  useEffect(() => {
    // Wait for DOM to be ready
    if (!showCardSelection) return;

    const updatePlaceholderPositions = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const positions = placeholderRefs.current.map(placeholder => {
        if (!placeholder) return { x: 0, y: 0 };

        const placeholderRect = placeholder.getBoundingClientRect();
        return {
          x: placeholderRect.left - containerRect.left + placeholderRect.width / 2 - cardWidth / 2,
          y: placeholderRect.top - containerRect.top - 52, // Small adjustment
        };
      });

      setPlaceholderPositions(positions);
    };

    // Initial calculation after a slight delay to ensure DOM is ready
    const timer = setTimeout(updatePlaceholderPositions, 100);

    // Update on window resize
    window.addEventListener('resize', updatePlaceholderPositions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePlaceholderPositions);
    };
  }, [showCardSelection, cardCount, cardWidth, containerRef]);

  return { placeholderRefs, placeholderPositions };
}
