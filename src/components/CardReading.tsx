import type { TarotCard as TarotCardType } from '@/Constant/tarot-cards';
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {cards.map(card => (
          <TarotCard key={card.id} card={card} showName isClickable={false} />
        ))}
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

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Overall Reading</h3>
        <p className="text-lg whitespace-pre-line">{interpretation}</p>
      </div>
    </div>
  );
}
