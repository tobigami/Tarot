import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface QuestionFormProps {
  onContinue: (question: string, cardCount: number) => void;
}

const cardCount = 5;

export default function QuestionForm({ onContinue }: QuestionFormProps) {
  const [question, setQuestion] = useState('');
  // const [cardCount, setCardCount] = useState(5);

  const handleContinue = () => {
    if (question.trim()) {
      onContinue(question, cardCount);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-900 text-purple-100 p-6 rounded-lg mb-6 shadow-md border border-purple-600">
        <p className="text-lg">
          Focus on your question as you draw the cards. The tarot will provide guidance and insight
          to help you navigate your situation.
        </p>
      </div>

      <div>
        <label htmlFor="question" className="block text-lg font-medium mb-2">
          What question would you like to ask?
        </label>
        <textarea
          id="question"
          className="w-full p-3 border border-purple-300 rounded-md h-24 bg-purple-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Enter your question here..."
        />
      </div>

      {/* <div>
        <label htmlFor="cardCount" className="block text-lg font-medium mb-2">
          How many cards would you like to draw? (1-5)
        </label>
        <input
          type="number"
          id="cardCount"
          min={1}
          max={5}
          className="w-24 p-3 border border-purple-300 rounded-md bg-purple-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
          value={cardCount}
          onChange={e => setCardCount(Number(e.target.value))}
        />
      </div> */}

      <Button
        size="lg"
        className="w-full mt-6 bg-purple-800 hover:bg-purple-700 text-white"
        onClick={handleContinue}
        disabled={!question.trim()}
      >
        Continue to Card Selection
      </Button>
    </div>
  );
}
