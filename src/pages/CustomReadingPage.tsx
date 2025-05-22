import { Button } from '@/components/ui/button';
import { ROUTES } from '@/Constant/routes.enum';
import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TAROT_CARDS } from '@/Constant/tarot-cards';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { TarotCard } from '@/components/TarotCard';

// Interface for selected card data
interface SelectedCard {
  cardId: number | null;
  position: 'upright' | 'reversed';
}

// CardSelector component with search functionality
interface CardSelectorProps {
  cardIndex: number;
  selectedCard: SelectedCard;
  onCardSelected: (index: number, cardId: number | null) => void;
  onPositionChanged: (index: number, position: 'upright' | 'reversed') => void;
  allSelectedCards: SelectedCard[]; // To check for already selected cards
}

function CardSelector({
  cardIndex,
  selectedCard,
  onCardSelected,
  onPositionChanged,
  allSelectedCards,
}: CardSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter cards based on search query
  const filteredCards = useMemo(() => {
    if (!searchQuery) return TAROT_CARDS;
    const query = searchQuery.toLowerCase();
    return TAROT_CARDS.filter(
      card =>
        card.name.toLowerCase().includes(query) ||
        (card.suit && card.suit.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Find the currently selected card
  const selectedCardData = useMemo(() => {
    if (selectedCard.cardId === null) return null;
    return TAROT_CARDS.find(card => card.id === selectedCard.cardId) || null;
  }, [selectedCard.cardId]);

  // Check if a card is already selected in another position
  const isCardAlreadySelected = useCallback(
    (cardId: number) => {
      return allSelectedCards.some((card, idx) => idx !== cardIndex && card.cardId === cardId);
    },
    [allSelectedCards, cardIndex]
  );

  return (
    <div className="space-y-4 bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-medium text-purple-800">Card {cardIndex + 1}</h3>

      <div className="space-y-2">
        <Input
          placeholder="Search cards by name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="mb-2"
        />

        <Select
          value={selectedCard.cardId !== null ? String(selectedCard.cardId) : ''}
          onValueChange={value => onCardSelected(cardIndex, value ? Number(value) : null)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a card" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {filteredCards.map(card => {
              const isAlreadySelected = isCardAlreadySelected(card.id);
              return (
                <SelectItem
                  key={card.id}
                  value={String(card.id)}
                  // disabled={isAlreadySelected}
                  className={isAlreadySelected ? 'opacity-50' : ''}
                >
                  {card.name} {card.suit ? `(${card.suit})` : ''}
                  {isAlreadySelected && ' (already selected)'}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {selectedCardData && (
        <div className="space-y-3">
          <div className="flex justify-center">
            <div
              className={`transition-transform duration-500 ease-in-out ${
                selectedCard.position === 'reversed' ? 'rotate-180' : 'rotate-0'
              }`}
            >
              <TarotCard
                card={{ ...selectedCardData, isReversed: selectedCard.position === 'reversed' }}
                isClickable={false}
                size="md"
              />
            </div>
          </div>

          <RadioGroup
            value={selectedCard.position}
            onValueChange={value => onPositionChanged(cardIndex, value as 'upright' | 'reversed')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upright" id={`upright-${cardIndex}`} />
              <label htmlFor={`upright-${cardIndex}`} className="text-purple-700 cursor-pointer">
                Upright
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="reversed" id={`reversed-${cardIndex}`} />
              <label htmlFor={`reversed-${cardIndex}`} className="text-purple-700 cursor-pointer">
                Reversed
              </label>
            </div>
          </RadioGroup>

          <div className="mt-2 p-2 bg-purple-100 rounded-md text-sm">
            <p className="font-semibold">Meaning: </p>
            <p>
              {selectedCard.position === 'upright'
                ? selectedCardData.uprightMeaning
                : selectedCardData.reversedMeaning}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CustomReadingPage() {
  const [question, setQuestion] = useState('');
  const [cardCount, setCardCount] = useState<3 | 5>(3); // Default to 3 cards
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([
    { cardId: null, position: 'upright' },
    { cardId: null, position: 'upright' },
    { cardId: null, position: 'upright' },
  ]);
  const navigate = useNavigate();

  const handleCardCountChange = useCallback((count: 3 | 5) => {
    if (count === 3) {
      // Trim to 3 cards if we're reducing
      setSelectedCards(prev => prev.slice(0, 3));
    } else {
      // Add 2 more card slots for a total of 5
      setSelectedCards(prev => [
        ...prev,
        { cardId: null, position: 'upright' },
        { cardId: null, position: 'upright' },
      ]);
    }
    setCardCount(count);
  }, []);

  const handleCardSelected = useCallback((index: number, cardId: number | null) => {
    setSelectedCards(prev => {
      const newCards = [...prev];
      newCards[index] = { ...newCards[index], cardId };
      return newCards;
    });
  }, []);

  const handlePositionChanged = useCallback((index: number, position: 'upright' | 'reversed') => {
    setSelectedCards(prev => {
      const newCards = [...prev];
      newCards[index] = { ...newCards[index], position };
      return newCards;
    });
  }, []);

  // Reset all card selections
  const handleResetCards = useCallback(() => {
    setSelectedCards(prev => prev.map(() => ({ cardId: null, position: 'upright' })));
  }, []);

  const handleGetReading = useCallback(() => {
    // Navigate to results page
    navigate(ROUTES.CUSTOM_RESULTS);
  }, [navigate, selectedCards, question]);

  // Memoize the isReadingReady function to avoid recalculation on every render
  const isReadingReady = useMemo(() => {
    return (
      question.trim() !== '' &&
      selectedCards.length > 0 &&
      selectedCards.every(card => card.cardId !== null)
    );
  }, [question, selectedCards]);

  // Memoize the question change handler
  const handleQuestionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8 rounded-lg shadow-md p-6 border border-purple-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-purple-800">Custom Card Reading</h1>
          <p className="text-lg text-purple-600 max-w-2xl mx-auto">
            If you've already drawn physical tarot cards, you can select them here to get a reading
            based on your selection. Enter your question and select the cards that you've drawn.
          </p>
        </div>

        <div className="space-y-4 bg-purple-50 p-6 rounded-lg">
          <label htmlFor="question" className="block text-lg font-medium text-purple-800 mb-2">
            What question would you like to ask?
          </label>
          <textarea
            id="question"
            className="w-full p-3 border border-purple-300 rounded-md h-24 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Enter your question here..."
          />
        </div>

        <div className="space-y-4">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-medium text-purple-800 mb-4">How many cards?</h2>
            <RadioGroup
              value={String(cardCount)}
              onValueChange={value => handleCardCountChange(parseInt(value) as 3 | 5)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="r1" />
                <label htmlFor="r1" className="text-purple-700 cursor-pointer">
                  3 Cards
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="r2" />
                <label htmlFor="r2" className="text-purple-700 cursor-pointer">
                  5 Cards
                </label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Card selectors */}
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-medium text-purple-800 mb-2">Select Your Cards</h2>
              <p className="text-purple-600">Choose the cards you've drawn and their positions.</p>
            </div>
            <Button
              variant="outline"
              onClick={handleResetCards}
              className="text-purple-700 border-purple-300"
              size="sm"
            >
              Reset Cards
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {selectedCards.map((card, index) => (
              <CardSelector
                key={index}
                cardIndex={index}
                selectedCard={card}
                onCardSelected={handleCardSelected}
                onPositionChanged={handlePositionChanged}
                allSelectedCards={selectedCards}
              />
            ))}
          </div>
        </div>

        <Button
          size="lg"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 mt-6"
          onClick={handleGetReading}
          disabled={!isReadingReady}
        >
          Get Reading
        </Button>

        {/* Reading status */}
        {!isReadingReady && (
          <p className="text-center text-amber-600 mt-2">
            {question.trim() === '' ? 'Please enter your question. ' : ''}
            {!selectedCards.every(card => card.cardId !== null)
              ? 'Please select all cards to get your reading.'
              : ''}
          </p>
        )}
      </div>
    </div>
  );
}
