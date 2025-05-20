interface CardSelectionInfoProps {
  selectedCardsCount: number;
  totalCardsNeeded: number;
}

export default function CardSelectionInfo({
  selectedCardsCount,
  totalCardsNeeded,
}: CardSelectionInfoProps) {
  return (
    <div className="bg-purple-900 text-purple-100 p-6 rounded-lg shadow-md border border-purple-600">
      <p className="text-lg mb-2">
        Select {totalCardsNeeded} cards that call to you. Trust your intuition.
      </p>
      <p className="text-sm italic mb-1">
        Selected: {selectedCardsCount} of {totalCardsNeeded}
      </p>
      <p className="text-xs text-purple-300 italic">
        Cards will appear in upright or reversed positions, which affects their interpretation.
      </p>
    </div>
  );
}
