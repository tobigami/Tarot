import { Button } from '@/components/ui/button';
import { ROUTES } from '@/Constant/routes.enum';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { TarotCardType as TarotCardType } from '@/Constant/tarot-cards';
import { CardReading } from '@/components/CardReading';

// This would come from context or state in a real app
const mockSelectedCards: (TarotCardType & { isReversed?: boolean })[] = [
  {
    id: 2,
    name: 'The Magician',
    image: '/cards/magician.jpg',
    isReversed: false,
    uprightMeaning: 'Manifestation, resourcefulness, power, inspired action',
    reversedMeaning: 'Manipulation, poor planning, untapped talents',
    symbolism:
      'The Magician represents your ability to communicate clearly, to be clever and skillful.',
  },
  {
    id: 10,
    name: 'Wheel of Fortune',
    image: '/cards/wheel-of-fortune.jpg',
    isReversed: true,
    uprightMeaning: 'Good luck, karma, life cycles, destiny, a turning point',
    reversedMeaning: 'Bad luck, resistance to change, breaking cycles',
    symbolism: 'The Wheel of Fortune symbolizes the inevitable cycles of life, karma, and destiny.',
  },
];

export default function CustomResultsPage() {
  // In a real app, we would get this from context, route state, or API
  const [userQuestion] = useState('Will I find a new job opportunity soon?');
  const [cards] = useState(mockSelectedCards);
  const [interpretation] = useState(`
The Magician upright suggests that you have all the skills and resources 
needed to find a new job opportunity. This card encourages you to tap into 
your talents and use them to manifest your desires. However, the Wheel of 
Fortune reversed indicates that you may be experiencing some resistance or 
bad luck in your job search currently. 

Together, these cards suggest that while you have what it takes to find a new 
job opportunity, there might be some obstacles or timing issues to overcome. 
Focus on utilizing your skills effectively, while also being patient with the 
process as the wheel turns in your favor.
  `);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Custom Tarot Reading</h1>

      <div className="max-w-4xl mx-auto">
        <CardReading question={userQuestion} cards={cards} interpretation={interpretation} />

        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <Link to={ROUTES.CUSTOM_READING}>
            <Button size="lg">New Reading</Button>
          </Link>
          <Button size="lg" variant="outline">
            Save Reading
          </Button>
        </div>
      </div>
    </div>
  );
}
