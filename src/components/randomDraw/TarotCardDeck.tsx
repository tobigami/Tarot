import { cn } from '@/lib/utils';
import { backCardImage, TAROT_CARDS } from '@/Constant/tarot-cards';
import type { RefObject } from 'react';
import { useState, useEffect } from 'react';
import './CardFlip.css';
import './CardLabels.css';
import optimizeLinkImage from '@/helper/optimizeLinkImage';

interface TarotCardDeckProps {
  totalCards: number;
  cardWidth: number;
  cardHeight: number;
  cardCount: number;
  selectedCards: number[];
  revealedCards: { index: number; cardId: number; isReversed?: boolean }[];
  hoveredCard: number | null;
  isShuffling: boolean;
  cardPositions: { x: number; y: number; rotation: number }[];
  cardOrientations: boolean[];
  highlightedCardIndexes: number[];
  containerRef: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>;
  placeholderPositions: { x: number; y: number }[];
  onCardClick: (index: number) => void;
  onCardHover: (index: number | null) => void;
  resetKey?: number; // Add resetKey to trigger resetting internal state
  setAllCardsFlipped: (flipped: boolean) => void; // Function to set all cards flipped
}

const canRotate = false;

export default function TarotCardDeck({
  totalCards,
  cardWidth,
  cardHeight,
  cardCount,
  selectedCards,
  revealedCards,
  hoveredCard,
  isShuffling,
  cardPositions,
  cardOrientations,
  highlightedCardIndexes,
  containerRef,
  placeholderPositions,
  onCardClick,
  onCardHover,
  setAllCardsFlipped,
  resetKey = 0,
}: TarotCardDeckProps) {
  // State to track which cards are flipped
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  // Reset flipped cards when resetKey changes
  useEffect(() => {
    if (resetKey > 0) {
      setFlippedCards([]);
    }
  }, [resetKey]);

  // Function to handle card flip
  const handleCardFlip = (index: number) => {
    if (selectedCards.includes(index)) {
      if (flippedCards.includes(index)) {
        // Unflip the card
        setFlippedCards(flippedCards.filter(cardIndex => cardIndex !== index));
      } else {
        // Flip the card
        setFlippedCards([...flippedCards, index]);
      }
    }
  };

  useEffect(() => {
    if (flippedCards.length === cardCount) {
      // All cards are flipped
      setAllCardsFlipped(true);
    } else {
      // Not all cards are flipped
      setAllCardsFlipped(false);
    }
  }, [flippedCards, cardCount, setAllCardsFlipped]);

  return (
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
              'absolute cursor-pointer transition-all tarot-card',
              isShuffling ? 'duration-800' : isSelected ? 'duration-500' : 'duration-300',
              `transform-gpu w-[${cardWidth}px]`,
              isSelected ? `z-[${30 + selectedIndex}]` : `z-10`,
              isShuffling
                ? 'cursor-not-allowed'
                : isSelected
                ? ''
                : selectedCards.length < totalCards
                ? 'cursor-pointer hover:shadow-lg hover:shadow-purple-300/30'
                : 'cursor-not-allowed opacity-70',
              highlightedCardIndexes.includes(index)
                ? 'ring-1 rounded-md ring-yellow-400 ring-opacity-80 shadow-xl shadow-yellow-300/40 animate-pulse'
                : ''
            )}
            style={{
              perspective: '1000px',
              height: `${cardHeight}px`,
              width: `${cardWidth}px`,
              transform:
                isSelected && selectedIndex !== -1 && placeholderPositions[selectedIndex]
                  ? `translateX(${placeholderPositions[selectedIndex].x}px) translateY(${
                      placeholderPositions[selectedIndex].y
                    }px) ${
                      revealedCard?.isReversed && canRotate ? 'rotate(180deg)' : ''
                    } scale(1.02)`
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
            onClick={() => {
              if (!isShuffling) {
                if (isSelected && selectedCards.length === cardCount) {
                  // If all cards have been selected and this is a selected card, flip it
                  handleCardFlip(index);
                } else if (!isSelected) {
                  // If it's not a selected card and we're still selecting cards, select it
                  onCardClick(index);
                }
              }
            }}
            onMouseEnter={() => !isShuffling && !isSelected && onCardHover(index)}
            onMouseLeave={() => onCardHover(null)}
          >
            <div
              className={cn(
                'absolute inset-0 w-full h-full transition-all duration-700 transform-gpu',
                'border-2 border-purple-500 rounded-md shadow-lg bg-gradient-to-br',
                isSelected ? 'from-purple-900 to-indigo-900' : 'from-purple-700 to-indigo-800',
                isSelected && selectedCards.length === cardCount ? 'card-flip-container' : '',
                isRevealed && flippedCards.includes(index)
                  ? 'style-preserve-3d rotate-y-180 flipped'
                  : ''
              )}
              style={{
                transformStyle: 'preserve-3d',
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
                  src={optimizeLinkImage(backCardImage, 100)}
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
                {/* Hint to flip when all cards are selected */}
                {isSelected &&
                  selectedCards.length === cardCount &&
                  !flippedCards.includes(index) && (
                    <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
                      <div className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full shadow-sm animate-pulse">
                        Click to flip
                      </div>
                    </div>
                  )}
              </div>

              {/* Card front (revealed) */}
              {isRevealed && revealedCard && (
                <div
                  className={cn(
                    'absolute inset-0 w-full h-full',
                    'flex flex-col items-center justify-center'
                  )}
                  style={{
                    transform: revealedCard.isReversed
                      ? 'rotateY(180deg) rotate(180deg)' // Flip and rotate for reversed cards
                      : 'rotateY(180deg)', // Just flip for upright cards
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src={optimizeLinkImage(TAROT_CARDS[revealedCard.cardId].image, 100)}
                    alt={`${TAROT_CARDS[revealedCard.cardId].name} ${
                      revealedCard.isReversed ? '(Reversed)' : ''
                    }`}
                    className="w-full h-full object-contain rounded"
                  />

                  {/* Mystical effects when card is flipped */}
                  {flippedCards.includes(index) && (
                    <>
                      {/* Initial flash effect when card is first revealed */}
                      <div className="card-flash"></div>

                      {/* Mystic aura around the card - smaller and non-persistent */}
                      <div className="mystic-aura"></div>

                      {/* Magic circle with runes */}
                      <div className="magic-circle">
                        {/* Magic runes around the circle */}
                        {['♄', '☿', '♃', '♀', '♂', '☉', '☽'].map((rune, i) => (
                          <div
                            key={`magic-rune-${i}`}
                            className="magic-rune absolute"
                            style={{
                              top: `${50 + 42 * Math.sin(i * ((2 * Math.PI) / 7))}%`,
                              left: `${50 + 42 * Math.cos(i * ((2 * Math.PI) / 7))}%`,
                              transform: 'translate(-50%, -50%)',
                              fontSize: '14px',
                            }}
                          >
                            {rune}
                          </div>
                        ))}
                      </div>

                      {/* Mystical smoke - fewer particles */}
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={`smoke-${i}`}
                          className="mystic-smoke"
                          style={{
                            left: `${25 + i * 13}%`,
                            bottom: `${15 + (i % 3) * 25}%`,
                            animationDelay: `${i * 0.25}s`,
                            scale: `${0.7 + (i % 3) * 0.2}`,
                          }}
                        ></div>
                      ))}

                      {/* Energy beams */}
                      <div
                        className="energy-beam"
                        style={{ animationDelay: '0.2s', left: '35%' }}
                      ></div>
                      <div
                        className="energy-beam"
                        style={{ animationDelay: '0.5s', left: '65%' }}
                      ></div>

                      {/* Tarot runes - reduced number */}
                      {['☽', '★', '♄'].map((rune, i) => (
                        <div
                          key={`rune-${i}`}
                          className="tarot-rune"
                          style={{
                            top: `${20 + (i % 3) * 30}%`,
                            left: `${20 + (i % 2) * 60}%`,
                            animationDelay: `${0.3 + i * 0.3}s`,
                          }}
                        >
                          {rune}
                        </div>
                      ))}

                      {/* Mystical overlay with purple and gold gradient */}
                      <div className="mystic-overlay"></div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Card name displayed below the card with mystical effect */}
            {isRevealed && revealedCard && flippedCards.includes(index) && (
              <div
                className="absolute bg-gradient-to-r from-purple-900/80 via-indigo-800/80 to-purple-900/80 rounded-lg px-2 py-1 text-center mx-auto shadow-lg card-name-label"
                style={{
                  width: 'max-content',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '4px',
                  maxWidth: `${cardWidth * 1.2}px`,
                  border: '1px solid rgba(255, 215, 130, 0.3)',
                  boxShadow:
                    '0 0 10px rgba(180, 120, 255, 0.5), 0 0 3px rgba(255, 215, 130, 0.3) inset',
                }}
              >
                <h3
                  className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 font-medium text-[10px] tracking-wide whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{
                    textShadow: '0 0 5px rgba(255, 230, 150, 0.5)',
                    letterSpacing: '0.03em',
                  }}
                >
                  ✧ {TAROT_CARDS[revealedCard.cardId].name} ✧{revealedCard.isReversed ? ' (R)' : ''}
                </h3>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
