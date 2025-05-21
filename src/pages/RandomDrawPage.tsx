import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/Constant/routes.enum';

// Component imports
import QuestionForm from '@/components/randomDraw/QuestionForm';
import ShuffleControls from '@/components/randomDraw/ShuffleControls';
import CardPlaceholders from '@/components/randomDraw/CardPlaceholders';
import TarotCardDeck from '@/components/randomDraw/TarotCardDeck';
import CardSelectionInfo from '@/components/randomDraw/CardSelectionInfo';
import CardSelectionActions from '@/components/randomDraw/CardSelectionActions';
import { usePlaceholderPositions } from '@/components/randomDraw/usePlaceholderPositions';
import { useShuffleAnimation } from '@/components/randomDraw/useShuffleAnimation';

const totalCards = 78;
const cardWidth = 100;
const cartHeight = 150;

export default function RandomDrawPage() {
  // State for text question and configuration
  const [question, setQuestion] = useState('');
  const [cardCount, setCardCount] = useState(3);
  const [showCardSelection, setShowCardSelection] = useState(false);

  // Card selection states
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [revealedCards, setRevealedCards] = useState<
    { index: number; cardId: number; isReversed?: boolean }[]
  >([]);
  const [allCardsFlipped, setAllCardsFlipped] = useState(false); // New state to track if all cards are flipped

  // Animation and display states
  const [isShuffling, setIsShuffling] = useState(false);
  const [cardPositions, setCardPositions] = useState<{ x: number; y: number; rotation: number }[]>(
    []
  );
  const [cardOrientations, setCardOrientations] = useState<boolean[]>([]); // true for upside down, false for upright
  const [highlightedCardIndexes, setHighlightedCardIndexes] = useState<number[]>([]);
  const [resetCounter, setResetCounter] = useState(0); // Add reset counter for TarotCardDeck

  const navigate = useNavigate();

  // Ref for the container element - initializing as null is fine for useRef
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const { placeholderRefs, placeholderPositions } = usePlaceholderPositions(
    showCardSelection,
    cardCount,
    cardWidth,
    containerRef
  );
  const { handleShuffleAnimation } = useShuffleAnimation();

  // Effect to update container width when window is resized
  useEffect(() => {
    const updateContainerWidth = () => {
      // Just update the ref, no need to store the width in state
      if (containerRef.current) {
        // The width is accessed directly from the ref when needed
      }
    };

    // Initial measurement
    updateContainerWidth();

    // Update on window resize
    window.addEventListener('resize', updateContainerWidth);

    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, [showCardSelection]);

  useEffect(() => {
    // Reset selected cards when card count changes
    setSelectedCards([]);
    setRevealedCards([]);
    setAllCardsFlipped(false); // Reset the all cards flipped state
  }, [cardCount]);

  // Initialize card positions
  useEffect(() => {
    if (showCardSelection) {
      initializeCardPositions();
    }
  }, [showCardSelection]);

  const initializeCardPositions = () => {
    const positions = Array.from({ length: totalCards }).map(() => ({
      x: 0,
      y: 0,
      rotation: 0,
    }));
    setCardPositions(positions);

    // Initialize all cards as upright
    setCardOrientations(Array(totalCards).fill(false));
  };

  const handleContinueToCardSelection = (
    questionText: string,
    count: number,
    name: string,
    age: number
  ) => {
    setQuestion(questionText); // Store question for later use in results
    setCardCount(count);
    setShowCardSelection(true);

    // Store user information in state to pass to results page later
    const userInfo = {
      name,
      age,
      question: questionText,
    };

    // Save to localStorage for persistence across page reloads
    localStorage.setItem('tarotUserInfo', JSON.stringify(userInfo));
  };

  const handleCardClick = (index: number) => {
    // If card is already selected or shuffling is in progress, ignore
    if (selectedCards.includes(index) || isShuffling) {
      return;
    }

    // If we haven't selected enough cards yet, add this one
    if (selectedCards.length < cardCount) {
      // Play card flip sound

      // Generate a unique random card ID (0-77 for all cards)
      let randomCardId;
      const existingCardIds = revealedCards.map(card => card.cardId);

      do {
        randomCardId = Math.floor(Math.random() * 78);
      } while (existingCardIds.includes(randomCardId));

      const newSelectedCards = [...selectedCards, index];
      setSelectedCards(newSelectedCards);

      // Randomly determine if card is reversed (50% chance)
      const isReversed = Math.random() < 0.5;

      // Store the card with the random orientation
      const newRevealedCards = [
        ...revealedCards,
        {
          index,
          cardId: randomCardId,
          isReversed,
        },
      ];
      setRevealedCards(newRevealedCards);

      // Check if all cards are now flipped
      // setAllCardsFlipped(newSelectedCards.length === cardCount);
    }
  };

  const handleDrawCards = () => {
    // Get user info from localStorage
    const userInfoString = localStorage.getItem('tarotUserInfo');
    let name = '';
    let age = 0;

    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      name = userInfo.name;
      age = userInfo.age;
    }

    // Pass the question and selected cards to the results page
    console.log(`Completing reading for question: ${question}`);
    console.log('revealedCards', revealedCards);

    // Navigate to results page with state containing the reading data
    navigate(ROUTES.RANDOM_RESULTS, {
      state: {
        question,
        selectedCards: revealedCards,
        name,
        age,
      },
    });
  };

  const handleShuffleCards = () => {
    if (isShuffling || selectedCards.length > 0) return;

    // Clear any existing highlighted cards
    setHighlightedCardIndexes([]);

    setIsShuffling(true);

    // Get container width for responsive scaling
    const containerWidth = containerRef.current?.offsetWidth || 300;

    handleShuffleAnimation({
      totalCards,
      containerWidth,
      onUpdatePositions: setCardPositions,
      onUpdateOrientations: setCardOrientations,
      onSetHighlightedIndexes: setHighlightedCardIndexes,
      onCompleteShuffling: () => setIsShuffling(false),
    });
  };

  const handleReset = () => {
    setSelectedCards([]);
    setRevealedCards([]);
    setAllCardsFlipped(false); // Reset the all cards flipped state
    setResetCounter(prevCount => prevCount + 1); // Increment reset counter to trigger TarotCardDeck reset
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-10">Random Card Draw</h1>

      {!showCardSelection ? (
        <QuestionForm onContinue={handleContinueToCardSelection} />
      ) : (
        <div className="space-y-8">
          <CardSelectionInfo
            selectedCardsCount={selectedCards.length}
            totalCardsNeeded={cardCount}
          />

          <ShuffleControls
            onShuffle={handleShuffleCards}
            onReset={handleReset}
            isShuffling={isShuffling}
            selectedCardsCount={selectedCards.length}
            totalCardsNeeded={cardCount}
          />

          {/* Card selection area with overlapping cards */}
          <div className="relative py-20">
            {/* Selected card placeholders */}
            <CardPlaceholders
              cardCount={cardCount}
              selectedCards={selectedCards}
              hoveredCard={hoveredCard}
              placeholderRefs={placeholderRefs}
              revealedCards={revealedCards}
              cardWidth={cardWidth}
              cardHeight={cartHeight}
            />

            <TarotCardDeck
              totalCards={totalCards}
              cardWidth={cardWidth}
              cardHeight={cartHeight}
              cardCount={cardCount}
              selectedCards={selectedCards}
              revealedCards={revealedCards}
              hoveredCard={hoveredCard}
              isShuffling={isShuffling}
              cardPositions={cardPositions}
              cardOrientations={cardOrientations}
              highlightedCardIndexes={highlightedCardIndexes}
              containerRef={containerRef}
              placeholderPositions={placeholderPositions}
              onCardClick={handleCardClick}
              onCardHover={setHoveredCard}
              resetKey={resetCounter}
              setAllCardsFlipped={setAllCardsFlipped} // Pass the setter function to update the state
            />
          </div>

          <CardSelectionActions
            selectedCardsCount={selectedCards.length}
            totalCardsNeeded={cardCount}
            onDrawCards={handleDrawCards}
            onBack={() => setShowCardSelection(false)}
            allCardsFlipped={allCardsFlipped}
          />
        </div>
      )}
    </div>
  );
}
