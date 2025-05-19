import { Button } from '@/components/ui/button';
import { ROUTES } from '@/Constant/routes.enum';
import { useParams, Link } from 'react-router-dom';
import { getCardById } from '@/Constant/tarot-cards';
import { TarotCard } from '@/components/TarotCard';
import { useState, useEffect } from 'react';

export default function CardDetailPage() {
  const { id } = useParams();
  const [card, setCard] = useState(getCardById(Number(id)));

  useEffect(() => {
    // Update card when id param changes
    setCard(getCardById(Number(id)));
  }, [id]);

  if (!card) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Card Not Found</h1>
        <p className="mb-6">The card you're looking for doesn't exist.</p>
        <Link to={ROUTES.CARD_GALLERY}>
          <Button>Back to Gallery</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="flex justify-center">
            <TarotCard card={card} size="lg" isClickable={false} />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-6">{card.name}</h1>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Upright Meaning</h2>
              <p className="text-lg">{card.uprightMeaning}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Reversed Meaning</h2>
              <p className="text-lg">{card.reversedMeaning}</p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Card Symbolism</h2>
          <p className="text-lg">{card.symbolism}</p>
        </div>

        <div className="text-center">
          <Link to={ROUTES.CARD_GALLERY}>
            <Button size="lg">Back to Gallery</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
