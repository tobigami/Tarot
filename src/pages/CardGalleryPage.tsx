import { useState } from 'react';
import { TAROT_CARDS } from '@/Constant/tarot-cards';
import { TarotCard } from '@/components/TarotCard';

export default function CardGalleryPage() {
  const [cards] = useState(TAROT_CARDS);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Tarot Card Gallery</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {cards.map(card => (
          <TarotCard key={card.id} card={card} size="sm" />
        ))}
      </div>
    </div>
  );
}
