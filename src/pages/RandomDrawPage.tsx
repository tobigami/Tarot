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
  const [revealedCards, setRevealedCards] = useState<{ index: number; cardId: number }[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [cardPositions, setCardPositions] = useState<{ x: number; y: number; rotation: number }[]>(
    []
  );
  const [highlightedCardIndexes, setHighlightedCardIndexes] = useState<number[]>([]);
  const navigate = useNavigate();

  const totalCards = 30; // Total number of cards to render
  const cardWidth = 100;

  // Ref for the container element
  const containerRef = useRef<HTMLDivElement>(null);
  console.log('containerRef', containerRef.current?.offsetWidth);

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

      // Generate a random card ID (0-21 for major arcana)
      const randomCardId = Math.floor(Math.random() * 78);
      setSelectedCards([...selectedCards, index]);
      setRevealedCards([...revealedCards, { index, cardId: randomCardId }]);
    }
  };

  const handleDrawCards = () => {
    // In a real app, we would store the question, cardCount, and selectedCards in context or state management
    // For now we'll just navigate to the results page
    navigate(ROUTES.RANDOM_RESULTS);
  };

  // End shuffling animation with a highlight effect
  const completeShuffling = () => {
    // Play cards placed sound
    playSound(SOUNDS.CARD_PLACE, 0.3);

    // Reset card positions
    initializeCardPositions();

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
      }, i * 40); // Increasing delay for cards further from center
    });
  };

  const handleShuffleCards = () => {
    if (isShuffling || selectedCards.length > 0) return;

    // Clear any existing highlighted cards
    setHighlightedCardIndexes([]);

    setIsShuffling(true);

    // Play shuffle sound
    playSound(SOUNDS.SHUFFLE, 0.5);

    // Multi-phase shuffle animation - more complex and visually interesting

    // Phase 1: Quick gather cards together
    const gatherPositions = Array.from({ length: totalCards }).map(() => ({
      x: Math.random() * 20 - 10, // Small random X offset
      y: Math.random() * 10 - 5, // Very small Y offset
      rotation: Math.random() * 8 - 4, // Slight rotation
    }));

    setCardPositions(gatherPositions);

    // Phase 2: First spread - cards fan out to left and right
    setTimeout(() => {
      const spreadPositions = Array.from({ length: totalCards }).map((_, i) => {
        // Alternate cards left and right
        const xDirection = i % 2 === 0 ? -1 : 1;
        return {
          x: xDirection * (70 + Math.random() * 30), // Fan out left and right
          y: Math.random() * 20 - 10,
          rotation: xDirection * (Math.random() * 10 + 5), // Slight rotation matching direction
        };
      });

      setCardPositions(spreadPositions);

      // Phase 3: Circular motion - cards move in a circular pattern
      setTimeout(() => {
        const circlePositions = Array.from({ length: totalCards }).map((_, i) => {
          // Calculate position on a circle
          const angle = (i / totalCards) * Math.PI * 2;
          const radius = 100 + Math.random() * 20;
          return {
            x: Math.cos(angle) * radius,
            y: (Math.sin(angle) * radius) / 2, // Elliptical shape
            rotation: Math.random() * 360, // Full rotation
          };
        });

        setCardPositions(circlePositions);

        // Phase 4: Chaotic scatter - cards move randomly
        setTimeout(() => {
          const chaoticPositions = Array.from({ length: totalCards }).map(() => ({
            x: Math.random() * 200 - 100,
            y: Math.random() * 160 - 80,
            rotation: Math.random() * 360,
          }));

          setCardPositions(chaoticPositions);

          // Phase 5: Final re-gather before setting back to normal
          setTimeout(() => {
            const finalGatherPositions = Array.from({ length: totalCards }).map(() => ({
              x: Math.random() * 30 - 15,
              y: Math.random() * 20 - 10,
              rotation: Math.random() * 20 - 10,
            }));

            setCardPositions(finalGatherPositions);

            // Phase 6: Return to normal positions
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
            <p className="text-sm italic">
              Selected: {selectedCards.length} of {cardCount}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 mb-4">
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
            {selectedCards.length === 0 && !isShuffling && (
              <p className="text-sm text-purple-600 italic">Shuffle the cards before selecting</p>
            )}
          </div>

          {/* Card selection area with overlapping cards */}
          <div className="relative py-20">
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

                const selectedOffset = selectedIndex >= 0 ? selectedIndex * 150 : 0;

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

                console.log('cardWidth', cardWidth);

                // spacing for selected cards

                return (
                  <div
                    key={index}
                    className={cn(
                      'absolute cursor-pointer transition-all',
                      isShuffling ? 'duration-800' : 'duration-300',
                      `transform-gpu w-[${cardWidth}px]`,
                      isSelected ? `z-${30 + selectedIndex}` : ``,
                      isShuffling ? 'cursor-not-allowed' : 'cursor-pointer',
                      highlightedCardIndexes.includes(index)
                        ? 'ring-4 ring-yellow-400 ring-opacity-80 shadow-xl shadow-yellow-300/40 animate-pulse'
                        : ''
                    )}
                    style={{
                      perspective: '1000px',
                      height: '150px',
                      width: `${cardWidth}px`,
                      transform: isSelected
                        ? `translateY(-200px) translateX(${selectedOffset}px)`
                        : isShuffling
                        ? `translateX(${offset + cardPositions[index].x}px) translateY(${
                            cardPositions[index].y
                          }px) rotate(${cardPositions[index].rotation}deg)`
                        : hoveredCard === index
                        ? `translateY(-20px) translateX(${offset}px)`
                        : `translateY(0) translateX(${offset}px)`,
                      left: 'calc(0% - 0px)', // center the cards
                      transition: isShuffling ? 'all 0.8s ease-in-out' : 'all 0.3s ease-in-out',
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
                            transform: 'rotateY(180deg)',
                            backfaceVisibility: 'hidden',
                          }}
                        >
                          <img
                            src={TAROT_CARDS[revealedCard.cardId].image}
                            alt={TAROT_CARDS[revealedCard.cardId].name}
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
              className="w-1/3 border-purple-500 text-purple-700"
              onClick={() => setShowCardSelection(false)}
            >
              Back
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-1/3 border-purple-500 text-purple-700"
              onClick={() => setSelectedCards([])}
            >
              Reset
            </Button>
            <Button
              size="lg"
              className="w-1/3 bg-purple-800 hover:bg-purple-700 text-white"
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
