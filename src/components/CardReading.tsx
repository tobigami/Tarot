import type { TarotCardType as TarotCardType } from '@/Constant/tarot-cards';
import { TarotCard } from './TarotCard';

interface CardReadingProps {
  question: string;
  cards: (TarotCardType & { isReversed?: boolean })[];
  interpretation: string;
}

export function CardReading({ question, cards, interpretation }: CardReadingProps) {
  return (
    <div className="space-y-8">
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
        {cards.map(card => (
          <div key={card.id} className="border-b pb-4">
            <h3 className="text-xl font-semibold">{card.name}</h3>
            <p className="font-medium">Position: {card.isReversed ? 'Reversed' : 'Upright'}</p>
            <p className="mt-2">{card.isReversed ? card.reversedMeaning : card.uprightMeaning}</p>
          </div>
        ))}
      </div>

      <div className="">
        <h3 className="text-xl font-semibold mb-4">Overall Reading</h3>
        <p className="text-lg whitespace-pre-line">{interpretation}</p>
      </div>
    </div>
  );
}
