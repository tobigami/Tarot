import type { TarotCardType as TarotCardType } from '@/Constant/tarot-cards';
import { TarotCard } from './TarotCard';

interface CardReadingProps {
  question: string;
  cards: (TarotCardType & { isReversed?: boolean })[];
  interpretation: string;
  userName?: string;
  userAge?: number;
  cardMeanings?: {
    meaningCard1?: string;
    meaningCard2?: string;
    meaningCard3?: string;
    meaningCard4?: string;
    meaningCard5?: string;
  };
}

export function CardReading({
  question,
  cards,
  interpretation,
  userName,
  userAge,
  cardMeanings,
}: CardReadingProps) {
  return (
    <div className="space-y-8">
      {/* User information */}
      {(userName || userAge) && (
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <h2 className="text-xl font-medium text-purple-800">Reading for:</h2>
          <div className="mt-2">
            {userName && (
              <p className="text-lg">
                <span className="font-medium">Name:</span> {userName}
              </p>
            )}
            {userAge && (
              <p className="text-lg">
                <span className="font-medium">Age:</span> {userAge}
              </p>
            )}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-medium">Your Question:</h2>
        <p className="text-lg mt-2">{question}</p>
      </div>

      {/* Custom card layout with 3 cards on top row and 2 cards on bottom row */}
      <div className="flex flex-col items-center space-y-8">
        {cards.length <= 3 ? (
          // If we have 3 or fewer cards, show them in a single row
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {cards.map(card => (
              <div key={card.id} className="w-[120px] md:w-[140px] lg:w-[160px] h-auto">
                <TarotCard
                  key={card.id}
                  card={card}
                  showName
                  isClickable={false}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        ) : (
          // If we have more than 3 cards, show first 3 on top, rest below
          <>
            {/* Top row - first 3 cards */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {cards.slice(0, 3).map(card => (
                <div key={card.id} className="w-[120px] md:w-[140px] lg:w-[160px] h-auto">
                  <TarotCard
                    key={card.id}
                    card={card}
                    showName
                    isClickable={false}
                    className="h-full"
                  />
                </div>
              ))}
            </div>

            {/* Bottom row - remaining cards (up to 2 for a 5-card spread) */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {cards.slice(3).map(card => (
                <div key={card.id} className="w-[120px] md:w-[140px] lg:w-[160px] h-auto">
                  <TarotCard
                    key={card.id}
                    card={card}
                    showName
                    isClickable={false}
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="space-y-6">
        {cards.map((card, index) => {
          // Get API-provided meaning for this card if available
          const apiMeaning =
            cardMeanings && cardMeanings[`meaningCard${index + 1}` as keyof typeof cardMeanings];

          return (
            <div key={card.id} className="border-b pb-4">
              <h3 className="text-xl font-semibold">{card.name}</h3>
              <p className="font-medium">Position: {card.isReversed ? 'Reversed' : 'Upright'}</p>

              {apiMeaning ? (
                // If we have API-provided meaning, use that with improved styling
                <div className="mt-3 bg-amber-50/30 p-3 rounded-md border border-amber-200 shadow-sm">
                  <p className="text-lg whitespace-pre-line">{apiMeaning}</p>
                </div>
              ) : (
                // Otherwise, fall back to the card's default meaning
                <div className="mt-3">
                  <h4 className="text-lg font-medium mb-1">Traditional Meaning:</h4>
                  <p>{card.isReversed ? card.reversedMeaning : card.uprightMeaning}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-slate-50/60 p-6 rounded-lg border border-slate-200 shadow-md mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-center">Overall Reading</h3>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg whitespace-pre-line">{interpretation}</p>
        </div>
      </div>
    </div>
  );
}
