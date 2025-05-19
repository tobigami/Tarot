// This file contains data for all tarot cards
// In a real app, this would likely be pulled from an API or database

export interface TarotCard {
  id: number;
  name: string;
  image: string;
  uprightMeaning: string;
  reversedMeaning: string;
  symbolism: string;
}

// In this example, we're using a simplified deck of cards
// A real tarot deck would typically have 78 cards (22 Major Arcana and 56 Minor Arcana)
export const TAROT_CARDS: TarotCard[] = [
  {
    id: 1,
    name: 'The Fool',
    image: '/cards/fool.jpg',
    uprightMeaning: 'New beginnings, innocence, spontaneity, free spirit',
    reversedMeaning: 'Recklessness, risk-taking, inconsideration',
    symbolism:
      "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe.",
  },
  {
    id: 2,
    name: 'The Magician',
    image: '/cards/magician.jpg',
    uprightMeaning: 'Manifestation, resourcefulness, power, inspired action',
    reversedMeaning: 'Manipulation, poor planning, untapped talents',
    symbolism:
      "The Magician represents your ability to communicate clearly, to be clever and skillful. It's the card of creative power, indicating that you have all the tools you need at your disposal.",
  },
  {
    id: 3,
    name: 'The High Priestess',
    image: '/cards/high-priestess.jpg',
    uprightMeaning: 'Intuition, sacred knowledge, divine feminine, the subconscious mind',
    reversedMeaning: 'Secrets, disconnected from intuition, withdrawal and silence',
    symbolism:
      'The High Priestess symbolizes wisdom, serenity, knowledge and understanding. She is often associated with the moon and feminine intuition.',
  },
  {
    id: 4,
    name: 'The Empress',
    image: '/cards/empress.jpg',
    uprightMeaning: 'Femininity, beauty, nature, nurturing, abundance',
    reversedMeaning: 'Creative block, dependence on others, empty-nest syndrome',
    symbolism:
      'The Empress is a symbol of femininity, beauty, nature, and abundance. She represents creation, nurturing, and the physical embodiment of life.',
  },
  {
    id: 5,
    name: 'The Emperor',
    image: '/cards/emperor.jpg',
    uprightMeaning: 'Authority, leadership, structure, control, rational thought',
    reversedMeaning: 'Domination, excessive control, rigid boundaries, micromanagement',
    symbolism:
      'The Emperor symbolizes structure, authority, and regulation. He represents the desire to control your surroundings and having conviction in your own beliefs.',
  },
  // In a real app, we would include all 52+ cards
];

// Get a card by ID
export const getCardById = (id: number): TarotCard | undefined => {
  return TAROT_CARDS.find(card => card.id === id);
};

// Get random cards for readings
export const getRandomCards = (count: number): TarotCard[] => {
  const shuffled = [...TAROT_CARDS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(card => ({
    ...card,
    isReversed: Math.random() > 0.5,
  }));
};
