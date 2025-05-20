import { Button } from '@/components/ui/button';

interface CardSelectionActionsProps {
  selectedCardsCount: number;
  totalCardsNeeded: number;
  onDrawCards: () => void;
  onBack: () => void;
  allCardsFlipped?: boolean; // Add new prop for checking if all cards are flipped
}

export default function CardSelectionActions({
  selectedCardsCount,
  totalCardsNeeded,
  onDrawCards,
  onBack,
  allCardsFlipped, // Default to true for backward compatibility
}: CardSelectionActionsProps) {
  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        size="lg"
        className="w-1/2 border-purple-500 text-purple-700"
        onClick={onBack}
      >
        Back
      </Button>

      <Button
        size="lg"
        className="w-1/2 bg-purple-800 hover:bg-purple-700 text-white"
        onClick={onDrawCards}
        disabled={selectedCardsCount !== totalCardsNeeded || !allCardsFlipped}
      >
        Complete Reading
      </Button>
    </div>
  );
}
