import { Button } from '@/components/ui/button';
import { ROUTES } from '@/Constant/routes.enum';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { TarotCard as TarotCardType } from '@/Constant/tarot-cards';
import { getRandomCards } from '@/Constant/tarot-cards';
import { CardReading } from '@/components/CardReading';

export default function RandomResultsPage() {
  // In a real app, we would get this data from context, route state, or API
  const [userQuestion] = useState('What does my career path look like in the next six months?');
  const [cards, setCards] = useState<(TarotCardType & { isReversed?: boolean })[]>([]);
  const [interpretation, setInterpretation] = useState('');

  // Generate random cards on component mount
  useEffect(() => {
    const randomCards = getRandomCards(3);
    setCards(randomCards);

    // Generate interpretation
    const interpretationText = generateInterpretation(randomCards, userQuestion);
    setInterpretation(interpretationText);
  }, [userQuestion]);

  // This would be much more sophisticated in a real app
  const generateInterpretation = (
    cards: (TarotCardType & { isReversed?: boolean })[],
    _question: string
  ) => {
    const cardDescriptions = cards
      .map(card => `${card.name} ${card.isReversed ? 'reversed' : 'upright'}`)
      .join(', ');

    return `With ${cardDescriptions}, your career path in the next six months shows both opportunities and challenges.
    
The cards suggest that you may encounter new opportunities that align with your skills and passions. However, there may be some obstacles to overcome before you can fully realize your potential in your career.

Focus on developing your strengths and addressing any weaknesses that might be holding you back. The cards indicate that with persistence and adaptability, you can make significant progress in your career over the next six months.

Remember that the cards provide guidance, but your actions and decisions ultimately shape your career path.`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10">Your Tarot Reading</h1>

      <div className="max-w-4xl mx-auto">
        <CardReading question={userQuestion} cards={cards} interpretation={interpretation} />

        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <Link to={ROUTES.RANDOM_DRAW}>
            <Button size="lg">Draw Again</Button>
          </Link>
          <Button size="lg" variant="outline">
            Save Reading
          </Button>
        </div>
      </div>
    </div>
  );
}
