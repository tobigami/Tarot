import { cn } from '@/lib/utils';
import type { RefObject } from 'react';
import '@/components/randomDraw/CardFlip.css';

interface CardPlaceholdersProps {
  cardCount: number;
  selectedCards: number[];
  hoveredCard: number | null;
  placeholderRefs: RefObject<(HTMLDivElement | null)[]>;
  revealedCards: { index: number; cardId: number; isReversed?: boolean }[];
  cardWidth: number;
  cardHeight: number;
}

export default function CardPlaceholders({
  cardCount,
  selectedCards,
  hoveredCard,
  placeholderRefs,
  revealedCards,
  cardHeight,
  cardWidth,
}: CardPlaceholdersProps) {
  return (
    <div className="mb-8 relative">
      <div className="absolute -top-8 left-0 right-0 text-center text-sm text-purple-700 font-medium">
        Your Reading Cards
      </div>
      <div className="flex flex-wrap justify-around gap-x-4 gap-y-10 md:gap-6">
        {Array.from({ length: cardCount }).map((_, index) => {
          const selectedCard = selectedCards[index];
          const hasSelectedCard = selectedCard !== undefined;
          const cardNumber = index + 1;

          return (
            <div
              key={`placeholder-${index}`}
              ref={el => {
                if (placeholderRefs.current) {
                  placeholderRefs.current[index] = el;
                }
              }}
              className={cn(
                'rounded-md border-2 transition-all duration-300',
                hasSelectedCard
                  ? 'border-purple-600 bg-purple-900/10 scale-105 shadow-lg shadow-purple-500/30 cursor-pointer'
                  : hoveredCard !== null &&
                    selectedCards.length < cardCount &&
                    selectedCards.length === index
                  ? 'border-dashed border-purple-400 bg-purple-200/20 scale-105 shadow-md shadow-purple-300/20 border-opacity-70'
                  : 'border-dashed border-purple-300 bg-purple-100/20',
                selectedCards.length === cardCount && hasSelectedCard ? 'hover:scale-110' : ''
              )}
              style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
            >
              {/* Card container with 3D flip effect */}
              <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
                <div
                  className={cn(
                    'absolute inset-0 w-full h-full transition-all duration-700 transform-gpu',
                    'flex flex-col items-center justify-center',
                    'border-[1px] border-purple-300 rounded-md',
                    'style-preserve-3d'
                  )}
                  style={{
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    MozTransformStyle: 'preserve-3d',
                    transform:
                      selectedCards.length === cardCount && hasSelectedCard && revealedCards[index]
                        ? 'rotateY(180deg)'
                        : 'rotateY(0deg)',
                    WebkitTransform:
                      selectedCards.length === cardCount && hasSelectedCard && revealedCards[index]
                        ? 'rotateY(180deg)'
                        : 'rotateY(0deg)',
                    MozTransform:
                      selectedCards.length === cardCount && hasSelectedCard && revealedCards[index]
                        ? 'rotateY(180deg)'
                        : 'rotateY(0deg)',
                  }}
                >
                  {/* Front side of card (placeholder) */}
                  <div
                    className="absolute inset-0 w-full h-full flex flex-col items-center justify-center rounded-md overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      MozBackfaceVisibility: 'hidden',
                    }}
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
                      <>
                        <div className="absolute inset-0 bg-purple-500/10 rounded-md overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-purple-200/20 to-transparent animate-pulse"></div>
                        </div>
                        {selectedCards.length === cardCount && (
                          <div className="text-purple-200 text-xs text-center mt-2 absolute top-2">
                            {cardCount <= 3
                              ? ['Past', 'Present', 'Future'][index] || `Card ${cardNumber}`
                              : `Card ${cardNumber}`}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Back side of card (tarot card) */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
