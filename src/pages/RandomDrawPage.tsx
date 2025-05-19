import { Button } from '@/components/ui/button';
import { ROUTES } from '@/Constant/routes.enum';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RandomDrawPage() {
  const [question, setQuestion] = useState('');
  const [cardCount, setCardCount] = useState(3);
  const navigate = useNavigate();

  const handleDrawCards = () => {
    // In a real app, we would store the question and cardCount in context or state management
    // For now we'll just navigate to the results page
    navigate(ROUTES.RANDOM_RESULTS);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-10">Random Card Draw</h1>

      <div className="space-y-6">
        <div className="bg-purple-50 p-6 rounded-lg mb-6">
          <p className="text-lg">
            Focus on your question as you draw the cards. The tarot will provide guidance and
            insight to help you navigate your situation.
          </p>
        </div>

        <div>
          <label htmlFor="question" className="block text-lg font-medium mb-2">
            What question would you like to ask?
          </label>
          <textarea
            id="question"
            className="w-full p-3 border rounded-md h-24"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Enter your question here..."
          />
        </div>

        <div>
          <label htmlFor="cardCount" className="block text-lg font-medium mb-2">
            How many cards would you like to draw? (1-5)
          </label>
          <input
            type="number"
            id="cardCount"
            min={1}
            max={5}
            className="w-24 p-3 border rounded-md"
            value={cardCount}
            onChange={e => setCardCount(Number(e.target.value))}
          />
        </div>

        <Button
          size="lg"
          className="w-full mt-6"
          onClick={handleDrawCards}
          disabled={!question.trim()}
        >
          Draw Cards
        </Button>
      </div>
    </div>
  );
}
