import { Button } from '@/components/ui/button';
import { ROUTES } from '@/Constant/routes.enum';
import { useState, useEffect, useRef } from 'react'; // Added useRef
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { TarotCardType } from '@/Constant/tarot-cards';
import { getCardById } from '@/Constant/tarot-cards';
import { CardReading } from '@/components/CardReading';
import { Notification } from '@/components/ui/Notification';
import { createTarotReading, addFeedback } from '@/Services/tarot.service';
import type { TarotCardRequest } from '@/Services/tarot.service';

interface LocationState {
  question: string;
  selectedCards: {
    index: number;
    cardId: number;
    isReversed?: boolean;
  }[];
  name: string;
  age: number;
}

export default function RandomResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [userQuestion, setUserQuestion] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userAge, setUserAge] = useState<number>(0);
  const [cards, setCards] = useState<(TarotCardType & { isReversed?: boolean })[]>([]);
  const [interpretation, setInterpretation] = useState('');
  const [cardMeanings, setCardMeanings] = useState<{
    meaningCard1?: string;
    meaningCard2?: string;
    meaningCard3?: string;
    meaningCard4?: string;
    meaningCard5?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  // const [isSaving, setIsSaving] = useState(false);
  // const [saveSuccess, setSaveSuccess] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  } | null>(null);

  // Feedback form state
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [isFeedbackSubmitting, setIsFeedbackSubmitting] = useState(false);

  // Ref to handle StrictMode's double useEffect invocation in development
  const devEffectToggle = useRef(true);

  useEffect(() => {
    const fetchTarotReading = async () => {
      // Get data from location state (passed from RandomDrawPage)
      const state = location.state as LocationState;
      if (!state || !state.question || !state.selectedCards || state.selectedCards.length === 0) {
        // No data was passed, redirect back to draw page
        navigate(ROUTES.RANDOM_DRAW);
        return;
      }

      setIsLoading(true);
      setApiError(null);

      // Set user question and info from passed data
      setUserQuestion(state.question);
      setUserName(state.name || '');
      setUserAge(state.age || 0);

      // Convert selected card IDs to actual tarot card objects first, outside try/catch
      // so we can use them in the fallback logic
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

      try {
        // Prepare cards data for API request
        const tarotCardRequests: TarotCardRequest[] = selectedTarotCards.map(card => ({
          name: card.name,
          position: card.isReversed ? 'reversed' : 'upright',
        }));

        // Call the API for interpretation
        const isDevEnv = import.meta.env.DEV; // Consistent check for development

        const apiResponse = await createTarotReading(
          state.question,
          tarotCardRequests,
          state.age || 0,
          state.name || '',
          isDevEnv // Use consistent variable
        );

        // Show success notification with the API's message
        setNotification({
          message: apiResponse.message || 'Tarot reading completed successfully',
          type: 'success',
          visible: true,
        });

        // Update interpretation from API response metadata
        setInterpretation(apiResponse.metadata.overAll);

        // Update card meanings from API response
        setCardMeanings({
          meaningCard1: apiResponse.metadata.meaningCard1,
          meaningCard2: apiResponse.metadata.meaningCard2,
          meaningCard3: apiResponse.metadata.meaningCard3,
          meaningCard4: apiResponse.metadata.meaningCard4,
          meaningCard5: apiResponse.metadata.meaningCard5,
        });
      } catch (error) {
        console.error('Failed to get tarot reading:', error);
        setApiError('Failed to get reading from the server. Generating fallback interpretation.');

        // Show error notification
        setNotification({
          message: 'Could not connect to the reading service. Using fallback interpretation.',
          type: 'error',
          visible: true,
        });

        // Fallback to local interpretation if API fails - we can safely use selectedTarotCards now
        const fallbackInterpretation = generateFallbackInterpretation(
          selectedTarotCards,
          state.question
        );
        setInterpretation(fallbackInterpretation);

        // Clear any card meanings, so we'll use the default meanings from the cards
        setCardMeanings({});
      } finally {
        setIsLoading(false);
      }
    };

    if (import.meta.env.DEV) {
      if (devEffectToggle.current) {
        fetchTarotReading();
      }
      devEffectToggle.current = !devEffectToggle.current;
    } else {
      fetchTarotReading(); // Run normally in production
    }
  }, [location.state, navigate]);

  // Generate a fallback reading interpretation if API fails
  const generateFallbackInterpretation = (
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

  // Handler function to save the current reading
  // const handleSaveReading = async () => {
  //   if (isSaving || saveSuccess || !cards.length || !userQuestion) return;

  //   setIsSaving(true);
  //   try {
  //     // Convert cards to the format expected by the API
  //     const cardRequests: TarotCardRequest[] = cards.map(card => ({
  //       name: card.name,
  //       position: card.isReversed ? 'reversed' : 'upright',
  //     }));

  //     // Call the API to save the reading with all relevant data
  //     await saveReading(userQuestion, cardRequests, interpretation, cardMeanings);

  //     // Update UI to show success
  //     setSaveSuccess(true);

  //     // Show success notification
  //     setNotification({
  //       message: 'Reading saved successfully! You can access it in your history.',
  //       type: 'success',
  //       visible: true,
  //     });
  //   } catch (error) {
  //     console.error('Failed to save reading:', error);

  //     // Show error notification
  //     setNotification({
  //       message: 'Failed to save your reading. Please try again later.',
  //       type: 'error',
  //       visible: true,
  //     });
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  // Toggle feedback form visibility
  const toggleFeedbackForm = () => {
    setShowFeedbackForm(prev => !prev);
  };

  // Handler for feedback submission
  const handleFeedbackSubmit = async () => {
    if (isFeedbackSubmitting || (!feedbackText.trim() && feedbackRating === 0)) return;

    setIsFeedbackSubmitting(true);
    try {
      // Build feedback content with rating and text
      const feedbackContent = `${feedbackText}`;

      // Call the API to submit feedback
      await addFeedback(userName || 'Anonymous', userAge || 0, feedbackContent);

      // Show success notification
      setNotification({
        message: 'Thank you for your feedback! We appreciate your input.',
        type: 'success',
        visible: true,
      });

      // Reset form
      setFeedbackText('');
      setFeedbackRating(0);
      setShowFeedbackForm(false);
    } catch (error) {
      console.error('Failed to submit feedback:', error);

      // Show error notification
      setNotification({
        message: 'Failed to submit feedback. Please try again later.',
        type: 'error',
        visible: true,
      });
    } finally {
      setIsFeedbackSubmitting(false);
    }
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
      {notification && notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <h1 className="text-3xl font-bold text-center mb-10">Your Tarot Reading</h1>

      {apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{apiError}</p>
        </div>
      )}

      <div className="space-y-8">
        <CardReading
          question={userQuestion}
          cards={cards}
          interpretation={interpretation}
          cardMeanings={cardMeanings}
          userName={userName}
          userAge={userAge}
        />

        {/* Feedback form */}
        {showFeedbackForm && (
          <div className="bg-purple-50/60 p-6 rounded-lg border border-purple-200 shadow-md mt-8 animate-in fade-in duration-300">
            <h3 className="text-xl font-semibold mb-4 text-center">Your Feedback</h3>
            <div className="space-y-4">
              <p className="text-purple-600">
                We value your thoughts on your tarot reading experience. Please share any feedback
                or suggestions:
              </p>
              <textarea
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                placeholder="Enter your feedback here..."
                className="w-full p-3 border border-purple-300 rounded-md min-h-32 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
              />
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setShowFeedbackForm(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleFeedbackSubmit}
                  disabled={isFeedbackSubmitting || (feedbackRating === 0 && !feedbackText.trim())}
                >
                  {isFeedbackSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <Link to={ROUTES.RANDOM_DRAW}>
            <Button size="lg">Draw Again</Button>
          </Link>
          {!showFeedbackForm && (
            <Button size="lg" variant="outline" onClick={toggleFeedbackForm}>
              Give Feedback
            </Button>
          )}
          {/* <Button
            size="lg"
            variant="outline"
            disabled={isSaving || saveSuccess}
            onClick={handleSaveReading}
          >
            {isSaving ? 'Saving...' : saveSuccess ? 'Reading Saved!' : 'Save Reading'}
          </Button> */}
        </div>
      </div>
    </div>
  );
}
