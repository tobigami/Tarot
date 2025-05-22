import { memo } from 'react';
import type { TarotCardType } from '@/Constant/tarot-cards';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/Constant/routes.enum';
import { Link } from 'react-router-dom';
import optimizeLinkImage from '@/helper/optimizeLinkImage';

interface TarotCardProps {
  card: TarotCardType & { isReversed?: boolean };
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  isClickable?: boolean;
  className?: string;
}

function TarotCardComponent({
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

  const widthClasses = {
    sm: 100,
    md: 150,
    lg: 200,
  };

  const cardContent = (
    <div
      className={cn(
        'border border-purple-600 rounded-lg overflow-hidden flex flex-col items-center transition-all duration-300 bg-gradient-to-br from-purple-100 to-indigo-100',
        isClickable && 'hover:shadow-lg',
        className
      )}
    >
      <div className={cn('relative mt-1', sizeClasses[size], card.isReversed && 'rotate-180')}>
        <img
          src={optimizeLinkImage(card.image, widthClasses[size])}
          alt={card.name}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>

      {showName && (
        <div className="p-2 text-center min-h-[3.5rem] flex flex-col justify-center w-full">
          <h3 className="text-sm font-semibold line-clamp-2">{card.name}</h3>
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

export const TarotCard = memo(TarotCardComponent);
