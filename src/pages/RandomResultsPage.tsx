import { Button } from '@/components/ui/button';
import { ROUTES } from '@/Constant/routes.enum';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { TarotCardType as TarotCardType } from '@/Constant/tarot-cards';
import { getCardById } from '@/Constant/tarot-cards';
import { CardReading } from '@/components/CardReading';

interface LocationState {
  question: string;
  selectedCards: {
    index: number;
    cardId: number;
    isReversed?: boolean;
  }[];
}

export default function RandomResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [userQuestion, setUserQuestion] = useState<string>('');
  const [cards, setCards] = useState<(TarotCardType & { isReversed?: boolean })[]>([]);
  const [interpretation, setInterpretation] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get data from location state (passed from RandomDrawPage)
    const state = location.state as LocationState;

    if (!state || !state.question || !state.selectedCards || state.selectedCards.length === 0) {
      // No data was passed, redirect back to draw page
      navigate(ROUTES.RANDOM_DRAW);
      return;
    }

    setIsLoading(true);

    // Set user question from passed data
    setUserQuestion(state.question);

    // Convert selected card IDs to actual tarot card objects
    const selectedTarotCards = state.selectedCards.map(selected => {
      const tarotCard = getCardById(selected.cardId);
      if (!tarotCard) {
        throw new Error(`Card with ID ${selected.cardId} not found`);
      }
      return {
        ...tarotCard,
        isReversed: selected.isReversed,
      };
    });

    setCards(selectedTarotCards);

    // Generate interpretation based on the selected cards
    const interpretationText = generateInterpretation(selectedTarotCards, state.question);
    setInterpretation(interpretationText);

    setIsLoading(false);
  }, [location.state, navigate]);

  // Generate a reading interpretation based on the selected cards
  const generateInterpretation = (
    cards: (TarotCardType & { isReversed?: boolean })[],
    question: string
  ) => {
    const cardDescriptions = cards
      .map(card => `${card.name} ${card.isReversed ? 'reversed' : 'upright'}`)
      .join(', ');

    // Create a more personalized interpretation based on the question
    let interpretationIntro = '';

    if (
      question.toLowerCase().includes('love') ||
      question.toLowerCase().includes('relationship')
    ) {
      interpretationIntro = `For your question about love and relationships, the cards ${cardDescriptions} reveal important insights.`;
    } else if (
      question.toLowerCase().includes('career') ||
      question.toLowerCase().includes('job') ||
      question.toLowerCase().includes('work')
    ) {
      interpretationIntro = `Regarding your career path, the cards ${cardDescriptions} show important influences.`;
    } else if (
      question.toLowerCase().includes('health') ||
      question.toLowerCase().includes('wellness')
    ) {
      interpretationIntro = `For your health concerns, the cards ${cardDescriptions} provide guidance.`;
    } else {
      interpretationIntro = `With ${cardDescriptions}, your reading provides the following insights:`;
    }

    return `${interpretationIntro}
    
The cards suggest a journey that combines both challenges and opportunities. Each card in your spread highlights different aspects that influence your situation.

${cards
  .map(
    card =>
      `The ${card.name} ${card.isReversed ? 'reversed' : 'upright'} suggests ${
        card.isReversed ? card.reversedMeaning.toLowerCase() : card.uprightMeaning.toLowerCase()
      }.`
  )
  .join('\n\n')}

Consider how these energies interact with each other and with your question. The cards offer guidance, but remember that you have the power to shape your own path and make choices that align with your highest good.`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-10">Loading Your Reading...</h1>
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 rounded-full border-t-transparent mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-10">Your Tarot Reading</h1>

      <div className="space-y-8">
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
