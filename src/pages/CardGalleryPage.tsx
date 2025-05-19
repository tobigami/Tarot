import { useState } from 'react';
import {
  TAROT_CARDS,
  getMajorArcanaCards,
  getMinorArcanaCards,
  getCardsBySuit,
} from '@/Constant/tarot-cards';
import { TarotCard } from '@/components/TarotCard';
import { Button } from '@/components/ui/button';

type Filter = 'all' | 'major' | 'minor' | 'wands' | 'cups' | 'swords' | 'pentacles';

export default function CardGalleryPage() {
  const [filter, setFilter] = useState<Filter>('all');

  const getFilteredCards = () => {
    switch (filter) {
      case 'major':
        return getMajorArcanaCards();
      case 'minor':
        return getMinorArcanaCards();
      case 'wands':
        return getCardsBySuit('Wands');
      case 'cups':
        return getCardsBySuit('Cups');
      case 'swords':
        return getCardsBySuit('Swords');
      case 'pentacles':
        return getCardsBySuit('Pentacles');
      default:
        return TAROT_CARDS;
    }
  };

  const filteredCards = getFilteredCards();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Tarot Card Gallery</h1>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>
          All Cards
        </Button>
        <Button
          variant={filter === 'major' ? 'default' : 'outline'}
          onClick={() => setFilter('major')}
        >
          Major Arcana
        </Button>
        <Button
          variant={filter === 'minor' ? 'default' : 'outline'}
          onClick={() => setFilter('minor')}
        >
          Minor Arcana
        </Button>
        <Button
          variant={filter === 'wands' ? 'default' : 'outline'}
          onClick={() => setFilter('wands')}
        >
          Wands
        </Button>
        <Button
          variant={filter === 'cups' ? 'default' : 'outline'}
          onClick={() => setFilter('cups')}
        >
          Cups
        </Button>
        <Button
          variant={filter === 'swords' ? 'default' : 'outline'}
          onClick={() => setFilter('swords')}
        >
          Swords
        </Button>
        <Button
          variant={filter === 'pentacles' ? 'default' : 'outline'}
          onClick={() => setFilter('pentacles')}
        >
          Pentacles
        </Button>
      </div>

      <p className="text-center mb-4">Showing {filteredCards.length} cards</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredCards.map(card => (
          <TarotCard key={card.id} card={card} size="sm" />
        ))}
      </div>
    </div>
  );
}
