import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface ShuffleControlsProps {
  onShuffle: () => void;
  onReset: () => void;
  isShuffling: boolean;
  selectedCardsCount: number;
  totalCardsNeeded: number;
}

export default function ShuffleControls({
  onShuffle,
  onReset,
  isShuffling,
  selectedCardsCount,
}: ShuffleControlsProps) {
  const [showHint, setShowHint] = useState(true);

  // Hide the hint after shuffling
  useEffect(() => {
    if (isShuffling || selectedCardsCount > 0) {
      setShowHint(false);
    } else {
      // Show the hint again when reset
      setShowHint(true);
    }
  }, [isShuffling, selectedCardsCount]);

  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <Button
        variant="outline"
        size="sm"
        className="w-fit border-purple-500 text-purple-700"
        onClick={onReset}
        disabled={isShuffling || selectedCardsCount === 0}
      >
        Reset
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          'border-purple-500 text-purple-700 hover:bg-purple-200 transition-all',
          selectedCardsCount === 0 && !isShuffling
            ? 'animate-pulse shadow-md shadow-purple-200/50'
            : ''
        )}
        onClick={onShuffle}
        disabled={isShuffling || selectedCardsCount > 0}
      >
        {isShuffling ? 'Shuffling...' : 'Shuffle Cards'}
      </Button>
      <div className="min-h-5">
        {showHint && selectedCardsCount === 0 && !isShuffling && (
          <p className="text-sm text-purple-600 italic">Shuffle the cards before selecting</p>
        )}
      </div>
    </div>
  );
}
