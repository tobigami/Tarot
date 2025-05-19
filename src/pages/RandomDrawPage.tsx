import { Button } from '@/components/ui/button';
import { ROUTES } from '@/Constant/routes.enum';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TAROT_CARDS } from '@/Constant/tarot-cards';
import { playSound, SOUNDS } from '@/lib/sound-utils';

export default function RandomDrawPage() {
  const [question, setQuestion] = useState('');
  const [cardCount, setCardCount] = useState(3);
  const [showCardSelection, setShowCardSelection] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [revealedCards, setRevealedCards] = useState<
    { index: number; cardId: number; isReversed?: boolean }[]
  >([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [cardPositions, setCardPositions] = useState<{ x: number; y: number; rotation: number }[]>(
    []
  );
  const [cardOrientations, setCardOrientations] = useState<boolean[]>([]); // true for upside down, false for upright
  const [highlightedCardIndexes, setHighlightedCardIndexes] = useState<number[]>([]);
  // Reference to the placeholder elements
  const placeholderRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  const totalCards = 25; // Total number of cards to render
  const cardWidth = 100;

  // Ref for the container element
  const containerRef = useRef<HTMLDivElement>(null);

  // Effect to update container width when window is resized
  useEffect(() => {
    const updateContainerWidth = () => {
      // Just update the ref, no need to store the width in state
      if (containerRef.current) {
        // The width is accessed directly from the ref when needed
      }
    };

    // Initial measurement
    updateContainerWidth();

    // Update on window resize
    window.addEventListener('resize', updateContainerWidth);

    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, [showCardSelection]);

  useEffect(() => {
    // Reset selected cards when card count changes
    setSelectedCards([]);
    setRevealedCards([]);
    // Initialize placeholder refs array
    placeholderRefs.current = Array(cardCount).fill(null);
  }, [cardCount]);

  // Initialize card positions
  useEffect(() => {
    if (showCardSelection) {
      initializeCardPositions();
    }
  }, [showCardSelection, totalCards]);

  const initializeCardPositions = () => {
    const positions = Array.from({ length: totalCards }).map(() => ({
      x: 0,
      y: 0,
      rotation: 0,
    }));
    setCardPositions(positions);

    // Initialize all cards as upright
    setCardOrientations(Array(totalCards).fill(false));
  };

  const handleContinueToCardSelection = () => {
    if (question.trim()) {
      setShowCardSelection(true);
    }
  };

  const handleCardClick = (index: number) => {
    // If card is already selected or shuffling is in progress, ignore
    if (selectedCards.includes(index) || isShuffling) {
      return;
    }

    // If we haven't selected enough cards yet, add this one
    if (selectedCards.length < cardCount) {
      // Play card flip sound
      playSound(SOUNDS.CARD_FLIP, 0.4);

      // Generate a random card ID (0-77 for all cards)
      const randomCardId = Math.floor(Math.random() * 78);
      setSelectedCards([...selectedCards, index]);
      // Store the card orientation (upright or reversed) when selected
      setRevealedCards([
        ...revealedCards,
        {
          index,
          cardId: randomCardId,
          isReversed: cardOrientations[index], // Store the orientation
        },
      ]);
    }
  };

  // Add placeholder positions state to store calculated positions
  const [placeholderPositions, setPlaceholderPositions] = useState<{ x: number; y: number }[]>([]);

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

      console.log('positions', positions);

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
  }, [showCardSelection, cardCount, cardWidth]);

  const handleDrawCards = () => {
    // In a real app, we would store the question, cardCount, and selectedCards in context or state management
    // For now we'll just navigate to the results page
    navigate(ROUTES.RANDOM_RESULTS);
  };

  // End shuffling animation with a highlight effect
  const completeShuffling = () => {
    // Set final positions based on whether cards are upright or reversed
    const finalPositions = Array.from({ length: totalCards }).map((_, i) => {
      // Add a very small random offset to make it look more natural
      const smallRandomX = Math.random() * 4 - 2; // Small X adjustment (-2 to 2 pixels)
      const smallRandomY = Math.random() * 4 - 2; // Small Y adjustment (-2 to 2 pixels)

      return {
        x: smallRandomX,
        y: smallRandomY,
        rotation: cardOrientations[i] ? 180 : 0, // Cards end up upside down or upright
      };
    });

    // Apply the final positioning smoothly
    setCardPositions(finalPositions);

    // Delay the rest of the completion logic to allow smooth animation
    setTimeout(() => {
      // Play cards placed sound
      playSound(SOUNDS.CARD_PLACE, 0.3);

      // End shuffling state
      setIsShuffling(false);

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
          setHighlightedCardIndexes(prev => [...prev, index]);

          // Play a soft click sound for each card (varied pitch)
          const volume = 0.1 - (i / totalCards) * 0.08; // Gradually decrease volume
          playSound(SOUNDS.CARD_PLACE, volume);

          // Remove highlight after a delay
          setTimeout(() => {
            setHighlightedCardIndexes(prev => prev.filter(idx => idx !== index));
          }, 300);
        }, i * 10); // Increasing delay for cards further from center
      });
    }, 300); // Allow time for the smooth animation
  };

  const handleShuffleCards = () => {
    if (isShuffling || selectedCards.length > 0) return;

    // Clear any existing highlighted cards
    setHighlightedCardIndexes([]);

    setIsShuffling(true);

    // Play shuffle sound
    playSound(SOUNDS.SHUFFLE, 0.5);

    // Randomly determine which cards will end up upside down
    const newCardOrientations = Array.from({ length: totalCards }).map(
      () => Math.random() > 0.5 // approximately 50% of cards will be upside down
    );
    setCardOrientations(newCardOrientations);

    // Keep track of the current position of each card
    // This will make the swapping effect more visible
    let cardPositionsTracker = Array.from({ length: totalCards }).map((_, i) => i);

    // Get container width for responsive scaling
    const containerWidth = containerRef.current?.offsetWidth || 300;
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

    setCardPositions(gatherPositions);

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

      setCardPositions(firstSwapPositions);

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

        setCardPositions(secondSwapPositions);

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

          setCardPositions(thirdSwapPositions);

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
                rotation: (cardOrientations[i] ? 160 : 20) + (Math.random() * 40 - 20), // Prepare for final orientation with some variation
              };
            });

            setCardPositions(finalSwapPositions);

            // Phase 6: Return to normal positions with a gentle alignment
            setTimeout(() => {
              completeShuffling();
            }, 400);
          }, 350);
        }, 350);
      }, 350);
    }, 300);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-10">Random Card Draw</h1>

      {!showCardSelection ? (
        <div className="space-y-6">
          <div className="bg-purple-900 text-purple-100 p-6 rounded-lg mb-6 shadow-md border border-purple-600">
            <p className="text-lg">
              Focus on your question as you draw the cards. The tarot will provide guidance and
              insight to help you navigate your situation.
            </p>
          </div>

          <div>
            <label htmlFor="question" className="block text-lg font-medium mb-2">
              What question would you like to ask?
            </label>
            <textarea
              id="question"
              className="w-full p-3 border border-purple-300 rounded-md h-24 bg-purple-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Enter your question here..."
            />
          </div>

          <div>
            <label htmlFor="cardCount" className="block text-lg font-medium mb-2">
              How many cards would you like to draw? (1-5)
            </label>
            <input
              type="number"
              id="cardCount"
              min={1}
              max={5}
              className="w-24 p-3 border border-purple-300 rounded-md bg-purple-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
              value={cardCount}
              onChange={e => setCardCount(Number(e.target.value))}
            />
          </div>

          <Button
            size="lg"
            className="w-full mt-6 bg-purple-800 hover:bg-purple-700 text-white"
            onClick={handleContinueToCardSelection}
            disabled={!question.trim()}
          >
            Continue to Card Selection
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-purple-900 text-purple-100 p-6 rounded-lg shadow-md border border-purple-600">
            <p className="text-lg mb-2">
              Select {cardCount} cards that call to you. Trust your intuition.
            </p>
            <p className="text-sm italic mb-1">
              Selected: {selectedCards.length} of {cardCount}
            </p>
            <p className="text-xs text-purple-300 italic">
              Cards will appear in upright or reversed positions, which affects their
              interpretation.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 mb-4">
            <Button
              variant="outline"
              size="lg"
              className="w-1/3 border-purple-500 text-purple-700"
              onClick={() => setSelectedCards([])}
            >
              Reset
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={cn(
                'border-purple-500 text-purple-700 hover:bg-purple-200 transition-all',
                selectedCards.length === 0 && !isShuffling
                  ? 'animate-pulse shadow-md shadow-purple-200/50'
                  : ''
              )}
              onClick={handleShuffleCards}
              disabled={isShuffling || selectedCards.length > 0}
            >
              {isShuffling ? 'Shuffling...' : 'Shuffle Cards'}
            </Button>
            <div className="min-h-5">
              {selectedCards.length === 0 && !isShuffling && (
                <p className="text-sm text-purple-600 italic">Shuffle the cards before selecting</p>
              )}
            </div>
          </div>

          {/* Card selection area with overlapping cards */}
          <div className="relative py-20">
            {/* Selected card placeholders */}
            <div className="mb-8 flex justify-center gap-6 relative">
              <div className="absolute -top-6 left-0 right-0 text-center text-sm text-purple-700 font-medium">
                Your Reading Cards
              </div>
              {Array.from({ length: cardCount }).map((_, index) => {
                const selectedCard = selectedCards[index];
                const hasSelectedCard = selectedCard !== undefined;
                const cardNumber = index + 1;

                return (
                  <div
                    key={`placeholder-${index}`}
                    ref={el => {
                      placeholderRefs.current[index] = el;
                    }}
                    className={cn(
                      'w-[100px] h-[150px] rounded-md border-2 transition-all duration-500',
                      hasSelectedCard
                        ? 'border-purple-600 bg-purple-900/30 scale-105 shadow-lg shadow-purple-500/30'
                        : hoveredCard !== null &&
                          selectedCards.length < cardCount &&
                          selectedCards.length === index
                        ? 'border-dashed border-purple-400 bg-purple-200/20 scale-105 shadow-md shadow-purple-300/20 border-opacity-70'
                        : 'border-dashed border-purple-300 bg-purple-100/20',
                      'flex flex-col items-center justify-center relative'
                    )}
                  >
                    {!hasSelectedCard && (
                      <>
                        <div className="text-purple-400 text-xs text-center mb-1">
                          {cardCount <= 3
                            ? ['Past', 'Present', 'Future'][index] || `Card ${cardNumber}`
                            : `Card ${cardNumber}`}
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-purple-300 flex items-center justify-center text-purple-400 text-lg font-semibold">
                          {cardNumber}
                        </div>
                      </>
                    )}
                    {!hasSelectedCard && selectedCards.length === index && (
                      <div className="absolute -bottom-5 left-0 right-0 text-center">
                        <div className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full shadow-sm animate-pulse">
                          Next
                        </div>
                      </div>
                    )}
                    {hasSelectedCard && (
                      <div className="absolute inset-0 bg-purple-500/10 rounded-md overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-200/20 to-transparent animate-pulse"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              ref={containerRef}
              className="flex flex-col justify-center items-center min-h-64 relative mx-auto w-full"
            >
              {Array.from({ length: totalCards }).map((_, index) => {
                const isSelected = selectedCards.includes(index);
                const revealedCard = revealedCards.find(card => card.index === index);
                const isRevealed = Boolean(revealedCard);
                const selectedIndex = selectedCards.indexOf(index);
                let offset = 15; // horizontal offset for each card

                // Calculate the horizontal position for the selected card
                // We don't need selectedOffset anymore as cards will move to their placeholder positions
                // const selectedOffset = selectedIndex >= 0 ? selectedIndex * 150 : 0;

                if (containerRef.current?.offsetWidth) {
                  const step = Math.abs(
                    (containerRef.current.offsetWidth - totalCards * cardWidth) / (totalCards - 1)
                  );

                  if (totalCards * cardWidth <= containerRef.current.offsetWidth) {
                    offset = (cardWidth + step) * index; // horizontal offset for each card
                  } else {
                    offset = (cardWidth - step) * index; // horizontal offset for each card
                  }
                }

                return (
                  <div
                    key={index}
                    className={cn(
                      'absolute cursor-pointer transition-all',
                      isShuffling ? 'duration-800' : isSelected ? 'duration-500' : 'duration-300',
                      `transform-gpu w-[${cardWidth}px]`,
                      isSelected ? `z-[${30 + selectedIndex}]` : `z-10`,
                      isShuffling
                        ? 'cursor-not-allowed'
                        : isSelected
                        ? ''
                        : selectedCards.length < cardCount
                        ? 'cursor-pointer hover:shadow-lg hover:shadow-purple-300/30'
                        : 'cursor-not-allowed opacity-70',
                      highlightedCardIndexes.includes(index)
                        ? 'ring-1 rounded-md ring-yellow-400 ring-opacity-80 shadow-xl shadow-yellow-300/40 animate-pulse'
                        : ''
                    )}
                    style={{
                      perspective: '1000px',
                      height: '150px',
                      width: `${cardWidth}px`,
                      transform:
                        isSelected && selectedIndex !== -1 && placeholderPositions[selectedIndex]
                          ? `translateX(${placeholderPositions[selectedIndex].x}px) translateY(${
                              placeholderPositions[selectedIndex].y
                            }px) ${revealedCard?.isReversed ? 'rotate(180deg)' : ''} scale(1.02)`
                          : isShuffling
                          ? `translateX(${offset + cardPositions[index].x}px) translateY(${
                              cardPositions[index].y
                            }px) rotate(${cardPositions[index].rotation}deg)`
                          : hoveredCard === index
                          ? `translateY(-20px) translateX(${offset}px) ${
                              !isSelected && cardOrientations[index] ? 'rotate(180deg)' : ''
                            } scale(1.05)`
                          : `translateY(0) translateX(${offset}px) ${
                              !isSelected && cardOrientations[index] ? 'rotate(180deg)' : ''
                            }`,
                      left: 'calc(0% - 0px)', // center the cards
                      transition: isShuffling
                        ? 'all 0.4s ease-in-out'
                        : isSelected
                        ? 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)'
                        : 'all 0.1s ease-in-out',
                      boxShadow: isSelected ? '0 10px 25px -5px rgba(124, 58, 237, 0.5)' : 'none',
                    }}
                    onClick={() => !isShuffling && handleCardClick(index)}
                    onMouseEnter={() => !isShuffling && !isSelected && setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className={cn(
                        'absolute inset-0 w-full h-full transition-all duration-700 transform-gpu',
                        'border-2 border-purple-500 rounded-md shadow-lg bg-gradient-to-br',
                        isSelected
                          ? 'from-purple-900 to-indigo-900'
                          : 'from-purple-700 to-indigo-800',
                        isRevealed ? '[transform:rotateY(180deg)]' : ''
                      )}
                      style={{
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      {/* Card back */}
                      <div
                        className={cn('absolute w-full h-full', 'flex items-center justify-center')}
                        style={{
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <img
                          src="https://tarotoo.com/wp-content/uploads/card-back-usual-625x1024.jpg-1.webp"
                          alt="Tarot card back"
                          className={cn(
                            'w-full h-full rounded-md shadow-md',
                            isShuffling ? 'opacity-90' : '',
                            highlightedCardIndexes.includes(index)
                              ? 'scale-105 brightness-125 shadow-lg shadow-yellow-300/30'
                              : ''
                          )}
                        />
                        {isShuffling && (
                          <div className="absolute inset-0 flex items-center justify-center bg-purple-900/30 rounded-md">
                            <div className="w-8 h-8 rounded-full border-4 border-purple-200 border-t-transparent animate-spin"></div>
                          </div>
                        )}
                        {highlightedCardIndexes.includes(index) && (
                          <div className="absolute inset-0 bg-yellow-400/10 rounded-md overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-yellow-200/40 to-transparent animate-pulse"></div>
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/50 to-transparent opacity-75 animate-pulse"></div>
                          </div>
                        )}
                      </div>

                      {/* Card front (revealed) */}
                      {isRevealed && revealedCard && (
                        <div
                          className={cn(
                            'absolute inset-0 w-full h-full',
                            'flex flex-col items-center justify-center p-1'
                          )}
                          style={{
                            transform: revealedCard.isReversed
                              ? 'rotateY(180deg) rotate(180deg)' // Flip and rotate for reversed cards
                              : 'rotateY(180deg)', // Just flip for upright cards
                            backfaceVisibility: 'hidden',
                          }}
                        >
                          <img
                            src={TAROT_CARDS[revealedCard.cardId].image}
                            alt={`${TAROT_CARDS[revealedCard.cardId].name} ${
                              revealedCard.isReversed ? '(Reversed)' : ''
                            }`}
                            className="w-full h-full object-contain rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              className="w-1/2 border-purple-500 text-purple-700"
              onClick={() => setShowCardSelection(false)}
            >
              Back
            </Button>

            <Button
              size="lg"
              className="w-1/2 bg-purple-800 hover:bg-purple-700 text-white"
              onClick={handleDrawCards}
              disabled={selectedCards.length !== cardCount}
            >
              Complete Reading
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
