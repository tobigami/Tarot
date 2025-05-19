import { Button } from '@/components/ui/button';
import { ROUTES } from '@/Constant/routes.enum';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TAROT_CARDS } from '@/Constant/tarot-cards';

export default function CustomReadingPage() {
  const [question, setQuestion] = useState('');
  const [selectedCards, setSelectedCards] = useState<
    Array<{ cardId: number | null; position: 'upright' | 'reversed' }>
  >([{ cardId: null, position: 'upright' }]);
  const navigate = useNavigate();

  const handleAddCard = () => {
    setSelectedCards([...selectedCards, { cardId: null, position: 'upright' }]);
  };

  const handleCardSelection = (index: number, cardId: number | null) => {
    const newCards = [...selectedCards];
    newCards[index].cardId = cardId;
    setSelectedCards(newCards);
  };

  const handlePositionChange = (index: number, position: 'upright' | 'reversed') => {
    const newCards = [...selectedCards];
    newCards[index].position = position;
    setSelectedCards(newCards);
  };

  const handleGetReading = () => {
    // In a real app, we would store this in context or pass via state in navigation
    navigate(ROUTES.CUSTOM_RESULTS);
  };

  const isReadingReady = () => {
    return (
      question.trim() !== '' &&
      selectedCards.length > 0 &&
      selectedCards.every(card => card.cardId !== null)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-10">Custom Card Reading</h1>

      <div className="space-y-8">
        <div className="bg-purple-50 p-6 rounded-lg">
          <p className="text-lg">
            If you've already drawn physical tarot cards, you can select them here to get a reading
            based on your selection. Enter your question and select the cards that you've drawn.
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
          <h2 className="text-xl font-medium mb-4">Select your cards:</h2>

          {selectedCards.map((card, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-grow">
                  <label className="block text-sm font-medium mb-1">Card {index + 1}:</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={card.cardId || ''}
                    onChange={e => handleCardSelection(index, Number(e.target.value) || null)}
                  >
                    <option value="">Select a card</option>
                    {TAROT_CARDS.map(tarotCard => (
                      <option key={tarotCard.id} value={tarotCard.id}>
                        {tarotCard.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Position:</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={card.position}
                    onChange={e =>
                      handlePositionChange(index, e.target.value as 'upright' | 'reversed')
                    }
                  >
                    <option value="upright">Upright</option>
                    <option value="reversed">Reversed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          {selectedCards.length < 5 && (
            <Button variant="outline" onClick={handleAddCard} className="w-full mt-2">
              + Add Another Card
            </Button>
          )}
        </div>

        <Button
          size="lg"
          className="w-full mt-6"
          onClick={handleGetReading}
          disabled={!isReadingReady()}
        >
          Get Reading
        </Button>
      </div>
    </div>
  );
}
