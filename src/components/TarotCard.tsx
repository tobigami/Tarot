import type { TarotCard as TarotCardType } from '@/Constant/tarot-cards';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/Constant/routes.enum';
import { Link } from 'react-router-dom';

interface TarotCardProps {
  card: TarotCardType & { isReversed?: boolean };
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  isClickable?: boolean;
  className?: string;
}

export function TarotCard({
  card,
  size = 'md',
  showName = true,
  isClickable = true,
  className,
}: TarotCardProps) {
  const sizeClasses = {
    sm: 'w-24 h-36',
    md: 'w-32 h-48',
    lg: 'w-48 h-72',
  };

  const cardContent = (
    <div
      className={cn(
        'border rounded-lg overflow-hidden flex flex-col items-center transition-all duration-300',
        isClickable && 'hover:shadow-lg',
        className
      )}
    >
      <div
        className={cn(
          'bg-gradient-to-br from-purple-100 to-indigo-100 relative',
          sizeClasses[size],
          card.isReversed && 'rotate-180'
        )}
      >
        {/* In a real app, this would be an actual image */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center text-center p-2',
            card.isReversed && 'rotate-180'
          )}
        >
          <span className="text-sm font-medium">{card.name} Image</span>
        </div>
      </div>

      {showName && (
        <div className="p-2 text-center">
          <h3 className="text-sm font-semibold">{card.name}</h3>
          {card.isReversed !== undefined && (
            <p className="text-xs text-gray-500">{card.isReversed ? 'Reversed' : 'Upright'}</p>
          )}
        </div>
      )}
    </div>
  );

  if (isClickable) {
    return <Link to={ROUTES.CARD_DETAIL.replace(':id', String(card.id))}>{cardContent}</Link>;
  }

  return cardContent;
}
