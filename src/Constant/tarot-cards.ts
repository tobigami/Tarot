// This file contains data for all tarot cards
// In a real app, this would likely be pulled from an API or database

export interface TarotCardType {
  id: number;
  name: string;
  image: string;
  suit?: string; // Added for minor arcana cards
  uprightMeaning: string;
  reversedMeaning: string;
  symbolism: string;
}

// https://tarotoo.com/wp-content/uploads/card-back-usual-625x1024.jpg-1.webp

export const backCardImage =
  'https://tarotoo.com/wp-content/uploads/card-back-usual-625x1024.jpg-1.webp';

// A complete tarot deck with 78 cards (22 Major Arcana and 56 Minor Arcana)

export const TAROT_CARDS: TarotCardType[] = [
  // Major Arcana (22 cards)
  {
    id: 0,
    name: 'The Fool',
    image:
      'https://res.cloudinary.com/thanhddshopdev/image/upload/v1747640828/sc6udwuffhnqmjvtcim0.png',
    uprightMeaning: 'New beginnings, innocence, spontaneity, free spirit',
    reversedMeaning: 'Recklessness, risk-taking, inconsideration',
    symbolism:
      "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe.",
  },
  {
    id: 1,
    name: 'The Magician',
    image: '/Cards/01-TheMagician.png',
    uprightMeaning: 'Manifestation, resourcefulness, power, inspired action',
    reversedMeaning: 'Manipulation, poor planning, untapped talents',
    symbolism:
      "The Magician represents your ability to communicate clearly, to be clever and skillful. It's the card of creative power, indicating that you have all the tools you need at your disposal.",
  },
  {
    id: 2,
    name: 'The High Priestess',
    image: '/Cards/02-TheHighPriestess.png',
    uprightMeaning: 'Intuition, sacred knowledge, divine feminine, the subconscious mind',
    reversedMeaning: 'Secrets, disconnected from intuition, withdrawal and silence',
    symbolism:
      'The High Priestess symbolizes wisdom, serenity, knowledge and understanding. She is often associated with the moon and feminine intuition.',
  },
  {
    id: 3,
    name: 'The Empress',
    image: '/Cards/03-TheEmpress.png',
    uprightMeaning: 'Femininity, beauty, nature, nurturing, abundance',
    reversedMeaning: 'Creative block, dependence on others, empty-nest syndrome',
    symbolism:
      'The Empress is a symbol of femininity, beauty, nature, and abundance. She represents creation, nurturing, and the physical embodiment of life.',
  },
  {
    id: 4,
    name: 'The Emperor',
    image: '/Cards/04-TheEmperor.png',
    uprightMeaning: 'Authority, leadership, structure, control, rational thought',
    reversedMeaning: 'Domination, excessive control, rigid boundaries, micromanagement',
    symbolism:
      'The Emperor symbolizes structure, authority, and regulation. He represents the desire to control your surroundings and having conviction in your own beliefs.',
  },
  {
    id: 5,
    name: 'The Hierophant',
    image: '/Cards/05-TheHierophant.png',
    uprightMeaning: 'Spiritual wisdom, religious beliefs, conformity, tradition',
    reversedMeaning: 'Personal beliefs, freedom, challenging the status quo',
    symbolism:
      'The Hierophant represents tradition, conformity, and moral-ethical principles. He is a symbol of education and organized religion.',
  },
  {
    id: 6,
    name: 'The Lovers',
    image: '/Cards/06-TheLovers.png',
    uprightMeaning: 'Love, harmony, relationships, values alignment, choices',
    reversedMeaning: 'Self-love, disharmony, imbalance, misalignment of values',
    symbolism:
      'The Lovers symbolize relationships and choices. It represents the union of opposites, connection, and alignment of values.',
  },
  {
    id: 7,
    name: 'The Chariot',
    image: '/Cards/07-TheChariot.png',
    uprightMeaning: 'Control, willpower, success, action, determination',
    reversedMeaning: 'Self-discipline, opposition, lack of direction',
    symbolism:
      'The Chariot represents overcoming obstacles through determination, willpower, and self-control. It suggests victory and the ability to harness opposing forces.',
  },
  {
    id: 8,
    name: 'Strength',
    image: '/Cards/08-Strength.png',
    uprightMeaning: 'Strength, courage, persuasion, influence, compassion',
    reversedMeaning: 'Inner strength, self-doubt, low energy, raw emotion',
    symbolism:
      'Strength represents inner courage, patience, compassion, and soft control. It suggests the ability to overcome challenges through inner strength rather than brute force.',
  },
  {
    id: 9,
    name: 'The Hermit',
    image: '/Cards/09-TheHermit.png',
    uprightMeaning: 'Soul-searching, introspection, being alone, inner guidance',
    reversedMeaning: 'Isolation, loneliness, withdrawal',
    symbolism:
      'The Hermit symbolizes introspection, contemplation, and inner search. It represents a period of reflection and the quest for deeper understanding.',
  },
  {
    id: 10,
    name: 'Wheel of Fortune',
    image: '/Cards/10-WheelOfFortune.png',
    uprightMeaning: 'Good luck, karma, life cycles, destiny, a turning point',
    reversedMeaning: 'Bad luck, resistance to change, breaking cycles',
    symbolism:
      'The Wheel of Fortune represents change, cycles, fate, and destiny. It suggests that what goes around comes around and reminds us of the natural cycles of life.',
  },
  {
    id: 11,
    name: 'Justice',
    image: '/Cards/11-Justice.png',
    uprightMeaning: 'Justice, fairness, truth, cause and effect, law',
    reversedMeaning: 'Unfairness, lack of accountability, dishonesty',
    symbolism:
      'Justice symbolizes fairness, truth, and law. It represents cause and effect, suggesting that our actions have consequences that will eventually come back to us.',
  },
  {
    id: 12,
    name: 'The Hanged Man',
    image: '/Cards/12-TheHangedMan.png',
    uprightMeaning: 'Surrender, letting go, new perspectives, enlightenment',
    reversedMeaning: 'Indecision, feeling stuck, delays, resistance',
    symbolism:
      'The Hanged Man represents surrender, sacrifice, and seeing from a new perspective. It suggests a time of suspension and waiting, but also of gaining spiritual insights.',
  },
  {
    id: 13,
    name: 'Death',
    image: '/Cards/13-Death.png',
    uprightMeaning: 'End of a cycle, transitions, letting go, transformation',
    reversedMeaning: 'Resistance to change, inability to move on, stagnation',
    symbolism:
      'Death symbolizes endings, transformation, and renewal. It represents the end of a phase or situation, leading the way to new beginnings.',
  },
  {
    id: 14,
    name: 'Temperance',
    image: '/Cards/14-Temperance.png',
    uprightMeaning: 'Balance, moderation, patience, purpose, meaning',
    reversedMeaning: 'Imbalance, excess, self-healing, realignment',
    symbolism:
      'Temperance represents balance, moderation, and patience. It suggests a need for finding middle ground and bringing harmony to various aspects of life.',
  },
  {
    id: 15,
    name: 'The Devil',
    image: '/Cards/15-TheDevil.png',
    uprightMeaning: 'Shadow self, attachment, addiction, restriction, sexuality',
    reversedMeaning: 'Releasing limiting beliefs, exploring dark thoughts, detachment',
    symbolism:
      'The Devil symbolizes our shadow self, attachments, and restrictions. It represents how we can become trapped by our own fears, dependencies, and material desires.',
  },
  {
    id: 16,
    name: 'The Tower',
    image: '/Cards/16-TheTower.png',
    uprightMeaning: 'Sudden change, upheaval, chaos, revelation, awakening',
    reversedMeaning: 'Fear of change, avoiding disaster, delaying the inevitable',
    symbolism:
      'The Tower represents sudden upheaval, breakthrough, and revelation. It suggests that established structures in our lives may crumble to make way for new growth.',
  },
  {
    id: 17,
    name: 'The Star',
    image: '/Cards/17-TheStar.png',
    uprightMeaning: 'Hope, faith, purpose, renewal, spirituality',
    reversedMeaning: 'Lack of faith, despair, self-trust, disconnection',
    symbolism:
      'The Star symbolizes hope, inspiration, and guidance. It represents a time of renewal, healing, and spiritual connection after a period of difficulty.',
  },
  {
    id: 18,
    name: 'The Moon',
    image: '/Cards/18-TheMoon.png',
    uprightMeaning: 'Illusion, fear, anxiety, subconscious, intuition',
    reversedMeaning: 'Release of fear, repressed emotion, inner confusion',
    symbolism:
      'The Moon represents the subconscious, intuition, and illusion. It suggests a time of uncertainty and possibly deception, but also of deep intuitive insights.',
  },
  {
    id: 19,
    name: 'The Sun',
    image: '/Cards/19-TheSun.png',
    uprightMeaning: 'Positivity, fun, warmth, success, vitality',
    reversedMeaning: 'Inner child, feeling down, overly optimistic',
    symbolism:
      'The Sun symbolizes joy, success, and vitality. It represents a time of clarity, warmth, and achievements after overcoming challenges.',
  },
  {
    id: 20,
    name: 'Judgement',
    image: '/Cards/20-Judgement.png',
    uprightMeaning: 'Rebirth, inner calling, absolution, self-evaluation',
    reversedMeaning: 'Self-doubt, refusal of self-examination, inner critic',
    symbolism:
      'Judgement represents awakening, renewal, and reckoning. It suggests a time of evaluation and recognizing our true calling or purpose.',
  },
  {
    id: 21,
    name: 'The World',
    image: '/Cards/21-TheWorld.png',
    uprightMeaning: 'Completion, achievement, travel, fulfillment, lessons learned',
    reversedMeaning: 'Seeking closure, short-cuts, delays',
    symbolism:
      'The World symbolizes completion, fulfillment, and wholeness. It represents the successful conclusion of a cycle and the integration of lessons learned.',
  },

  // Minor Arcana - Wands (14 cards)
  {
    id: 22,
    name: 'Ace of Wands',
    image: '/Cards/Wands01.png',
    suit: 'Wands',
    uprightMeaning: 'Inspiration, creative spark, new initiatives, growth',
    reversedMeaning: 'Creative blocks, delays, lack of enthusiasm',
    symbolism:
      'The Ace of Wands represents new beginnings, inspiration, and potential. It signifies the initial spark of creativity and the start of a new venture or idea.',
  },
  {
    id: 23,
    name: 'Two of Wands',
    image: '/Cards/Wands02.png',
    suit: 'Wands',
    uprightMeaning: 'Planning, making decisions, leaving comfort, future planning',
    reversedMeaning: 'Fear of change, playing it safe, bad planning',
    symbolism:
      'The Two of Wands represents planning, decision-making, and personal power. It suggests weighing options and preparing for future expansion.',
  },
  {
    id: 24,
    name: 'Three of Wands',
    image: '/Cards/Wands03.png',
    suit: 'Wands',
    uprightMeaning: 'Expansion, progress, foresight, overseas opportunities',
    reversedMeaning: 'Obstacle, delays, frustration, lack of foresight',
    symbolism:
      'The Three of Wands symbolizes expansion, progress, and looking ahead. It represents the phase where plans move into action and begin to show results.',
  },
  {
    id: 25,
    name: 'Four of Wands',
    image: '/Cards/Wands04.png',
    suit: 'Wands',
    uprightMeaning: 'Celebration, harmony, homecoming, community',
    reversedMeaning: 'Lack of support, transience, home conflicts',
    symbolism:
      'The Four of Wands represents celebration, harmony, and homecoming. It suggests a time of joyful gatherings, milestones, and community support.',
  },
  {
    id: 26,
    name: 'Five of Wands',
    image: '/Cards/Wands05.png',
    suit: 'Wands',
    uprightMeaning: 'Conflict, disagreements, competition, tension',
    reversedMeaning: 'Conflict avoidance, tension release, compromise',
    symbolism:
      'The Five of Wands symbolizes conflict, competition, and struggles. It represents the challenges and tensions that arise when multiple forces or viewpoints clash.',
  },
  {
    id: 27,
    name: 'Six of Wands',
    image: '/Cards/Wands06.png',
    suit: 'Wands',
    uprightMeaning: 'Victory, success, public recognition, progress',
    reversedMeaning: 'Fall from grace, egotism, disappointment',
    symbolism:
      'The Six of Wands represents victory, recognition, and achievement. It suggests a time of triumph and acknowledgment for your efforts and accomplishments.',
  },
  {
    id: 28,
    name: 'Seven of Wands',
    image: '/Cards/Wands07.png',
    suit: 'Wands',
    uprightMeaning: 'Challenge, competition, protection, perseverance',
    reversedMeaning: 'Giving up, overwhelmed, exhaustion',
    symbolism:
      'The Seven of Wands symbolizes defensiveness, standing your ground, and overcoming challenges. It represents fighting for what you believe in despite opposition.',
  },
  {
    id: 29,
    name: 'Eight of Wands',
    image: '/Cards/Wands08.png',
    suit: 'Wands',
    uprightMeaning: 'Movement, speed, progress, quick decisions',
    reversedMeaning: 'Obstacles, delays, frustration, stagnation',
    symbolism:
      'The Eight of Wands represents swift action, movement, and progress. It suggests a time when things happen quickly and there is a forward momentum in your endeavors.',
  },
  {
    id: 30,
    name: 'Nine of Wands',
    image: '/Cards/Wands09.png',
    suit: 'Wands',
    uprightMeaning: 'Resilience, courage, persistence, last stand',
    reversedMeaning: 'Exhaustion, giving up, too stubborn',
    symbolism:
      'The Nine of Wands symbolizes resilience, courage, and perseverance. It represents standing firm in the face of challenges, despite feeling battered from previous struggles.',
  },
  {
    id: 31,
    name: 'Ten of Wands',
    image: '/Cards/Wands10.png',
    suit: 'Wands',
    uprightMeaning: 'Burden, responsibility, hard work, achievement',
    reversedMeaning: 'Avoiding responsibility, delegating, burden sharing',
    symbolism:
      'The Ten of Wands represents burdens, responsibilities, and hard work. It suggests carrying a heavy load or taking on too many responsibilities that may be weighing you down.',
  },
  {
    id: 32,
    name: 'Page of Wands',
    image: '/Cards/Wands11.png',
    suit: 'Wands',
    uprightMeaning: 'Exploration, excitement, freedom, new ideas',
    reversedMeaning: 'Procrastination, hasty actions, lack of direction',
    symbolism:
      'The Page of Wands symbolizes exploration, enthusiasm, and potential. It represents the initial stages of new ideas or ventures and an adventurous, free-spirited energy.',
  },
  {
    id: 33,
    name: 'Knight of Wands',
    image: '/Cards/Wands12.png',
    suit: 'Wands',
    uprightMeaning: 'Action, adventure, fearlessness, impulsivity',
    reversedMeaning: 'Anger, impulsivity, recklessness, setbacks',
    symbolism:
      'The Knight of Wands represents energy, passion, and action. It suggests moving forward with confidence and enthusiasm, though sometimes impulsively.',
  },
  {
    id: 34,
    name: 'Queen of Wands',
    image: '/Cards/Wands13.png',
    suit: 'Wands',
    uprightMeaning: 'Courage, confidence, determination, social butterfly',
    reversedMeaning: 'Self-doubt, jealousy, insecurity, dependence',
    symbolism:
      'The Queen of Wands symbolizes confidence, warmth, and vibrancy. She represents passionate energy, determination, and a sunny disposition.',
  },
  {
    id: 35,
    name: 'King of Wands',
    image: '/Cards/Wands14.png',
    suit: 'Wands',
    uprightMeaning: 'Leadership, vision, entrepreneur, honor',
    reversedMeaning: 'Impulsive, domineering, tyrant, vain pride',
    symbolism:
      'The King of Wands represents leadership, vision, and creative authority. He signifies inspiration, charisma, and the ability to transform ideas into action.',
  },

  // Minor Arcana - Cups (14 cards)
  {
    id: 36,
    name: 'Ace of Cups',
    image: '/Cards/Cups01.png',
    suit: 'Cups',
    uprightMeaning: 'New feelings, intuition, intimacy, love, compassion',
    reversedMeaning: 'Emotional loss, blocked creativity, emptiness',
    symbolism:
      'The Ace of Cups represents new emotional beginnings, love, intuition, and spiritual connection. It suggests the potential for deep emotional fulfillment and creative flow.',
  },
  {
    id: 37,
    name: 'Two of Cups',
    image: '/Cards/Cups02.png',
    suit: 'Cups',
    uprightMeaning: 'Unity, partnership, mutual attraction, connection',
    reversedMeaning: 'Imbalanced relationships, tension, miscommunication',
    symbolism:
      'The Two of Cups symbolizes connection, partnership, and mutual respect. It represents the harmonious balance of energies between two people or aspects of yourself.',
  },
  {
    id: 38,
    name: 'Three of Cups',
    image: '/Cards/Cups03.png',
    suit: 'Cups',
    uprightMeaning: 'Celebration, friendship, creativity, community',
    reversedMeaning: 'Overindulgence, gossip, isolation',
    symbolism:
      'The Three of Cups represents celebration, friendship, and mutual support. It suggests a time of joy, social gatherings, and creative collaboration.',
  },
  {
    id: 39,
    name: 'Four of Cups',
    image: '/Cards/Cups04.png',
    suit: 'Cups',
    uprightMeaning: 'Contemplation, apathy, reevaluation, discontent',
    reversedMeaning: 'New beginnings, optimism, acceptance',
    symbolism:
      'The Four of Cups symbolizes contemplation, introspection, and discontent. It represents a time of withdrawal to reassess what truly matters and what no longer serves you.',
  },
  {
    id: 40,
    name: 'Five of Cups',
    image: '/Cards/Cups05.png',
    suit: 'Cups',
    uprightMeaning: 'Regret, failure, disappointment, pessimism',
    reversedMeaning: 'Moving on, acceptance, renewed hope',
    symbolism:
      'The Five of Cups represents loss, disappointment, and regret. It suggests focusing too much on what has been lost rather than what remains or what new opportunities exist.',
  },
  {
    id: 41,
    name: 'Six of Cups',
    image: '/Cards/Cups06.png',
    suit: 'Cups',
    uprightMeaning: 'Nostalgia, childhood memories, innocence, joy',
    reversedMeaning: 'Moving forward, leaving past behind',
    symbolism:
      'The Six of Cups symbolizes nostalgia, innocence, and happy memories. It represents reconnecting with the past, simple pleasures, and giving or receiving kindness.',
  },
  {
    id: 42,
    name: 'Seven of Cups',
    image: '/Cards/Cups07.png',
    suit: 'Cups',
    uprightMeaning: 'Choices, fantasy, illusion, wishful thinking',
    reversedMeaning: 'Clarity, focus, conviction, determination',
    symbolism:
      'The Seven of Cups represents choices, fantasy, and illusion. It suggests being faced with many options but needing discernment to differentiate between realistic possibilities and mere daydreams.',
  },
  {
    id: 43,
    name: 'Eight of Cups',
    image: '/Cards/Cups08.png',
    suit: 'Cups',
    uprightMeaning: 'Walking away, disillusionment, leaving behind',
    reversedMeaning: 'Fear of change, fear of loss, staying in a bad situation',
    symbolism:
      'The Eight of Cups symbolizes emotional detachment, walking away, and seeking deeper meaning. It represents the courage to leave behind what is familiar but no longer fulfilling.',
  },
  {
    id: 44,
    name: 'Nine of Cups',
    image: '/Cards/Cups09.png',
    suit: 'Cups',
    uprightMeaning: 'Contentment, satisfaction, gratitude, wish come true',
    reversedMeaning: 'Inner happiness, materialism, complacency',
    symbolism:
      'The Nine of Cups represents contentment, emotional fulfillment, and wishes granted. It suggests a time of satisfaction and gratitude for the abundance in your life.',
  },
  {
    id: 45,
    name: 'Ten of Cups',
    image: '/Cards/Cups10.png',
    suit: 'Cups',
    uprightMeaning: 'Divine love, harmony, alignment, joy',
    reversedMeaning: 'Broken bonds, disconnection, misaligned values',
    symbolism:
      'The Ten of Cups symbolizes harmony, happiness, and fulfillment. It represents the ideal of emotional contentment, particularly in family and community bonds.',
  },
  {
    id: 46,
    name: 'Page of Cups',
    image: '/Cards/Cups11.png',
    suit: 'Cups',
    uprightMeaning: 'Creativity, intuition, sensitivity, new ideas',
    reversedMeaning: 'Emotional immaturity, insecurity, disappointment',
    symbolism:
      'The Page of Cups represents creative beginnings, intuitive messages, and emotional sensitivity. It suggests openness to inspiration and a childlike curiosity about emotional experiences.',
  },
  {
    id: 47,
    name: 'Knight of Cups',
    image: '/Cards/Cups12.png',
    suit: 'Cups',
    uprightMeaning: 'Romance, charm, imagination, beauty',
    reversedMeaning: 'Moodiness, disappointment, unrealistic',
    symbolism:
      'The Knight of Cups symbolizes romance, charm, and idealism. It represents pursuing emotional quests with sensitivity and grace, though sometimes with unrealistic expectations.',
  },
  {
    id: 48,
    name: 'Queen of Cups',
    image: '/Cards/Cups13.png',
    suit: 'Cups',
    uprightMeaning: 'Compassion, nurturing, emotional intelligence, intuition',
    reversedMeaning: 'Emotional insecurity, martyrdom, dependency',
    symbolism:
      'The Queen of Cups represents emotional depth, compassion, and intuition. She signifies nurturing energy, empathy, and the ability to connect with the unconscious mind.',
  },
  {
    id: 49,
    name: 'King of Cups',
    image: '/Cards/Cups14.png',
    suit: 'Cups',
    uprightMeaning: 'Emotional balance, compassion, diplomacy',
    reversedMeaning: 'Emotional manipulation, moodiness, selfishness',
    symbolism:
      'The King of Cups symbolizes emotional maturity, diplomacy, and balance. He represents mastery over emotional realms and the ability to handle challenging situations with compassion and wisdom.',
  },

  // Minor Arcana - Swords (14 cards)
  {
    id: 50,
    name: 'Ace of Swords',
    image: '/Cards/Swords01.png',
    suit: 'Swords',
    uprightMeaning: 'Breakthrough, clarity, sharp mind, truth',
    reversedMeaning: 'Confusion, brutality, chaos, clouded judgment',
    symbolism:
      'The Ace of Swords represents mental clarity, truth, and breakthrough ideas. It suggests the power of the intellect to cut through confusion and reveal essential truths.',
  },
  {
    id: 51,
    name: 'Two of Swords',
    image: '/Cards/Swords02.png',
    suit: 'Swords',
    uprightMeaning: 'Difficult choices, stalemate, indecision, truce',
    reversedMeaning: 'Indecision, confusion, information overload',
    symbolism:
      'The Two of Swords symbolizes difficult decisions, stalemate, and denial. It represents being torn between options and possibly refusing to see the reality of a situation.',
  },
  {
    id: 52,
    name: 'Three of Swords',
    image: '/Cards/Swords03.png',
    suit: 'Swords',
    uprightMeaning: 'Heartbreak, emotional pain, sorrow, grief',
    reversedMeaning: 'Recovery, forgiveness, moving on',
    symbolism:
      'The Three of Swords represents heartbreak, painful truths, and grief. It suggests a time of sorrow but also the cleansing nature of emotional pain and the growth that can come from it.',
  },
  {
    id: 53,
    name: 'Four of Swords',
    image: '/Cards/Swords04.png',
    suit: 'Swords',
    uprightMeaning: 'Rest, recuperation, contemplation, passive activity',
    reversedMeaning: 'Recovery, awakening, renewal, returning to activity',
    symbolism:
      'The Four of Swords represents rest, contemplation, and recovery. It suggests taking time out from stress and conflict to restore your mental and physical health.',
  },
  {
    id: 54,
    name: 'Five of Swords',
    image: '/Cards/Swords05.png',
    suit: 'Swords',
    uprightMeaning: 'Conflict, disagreements, defeat, winning at all costs',
    reversedMeaning: 'Reconciliation, making amends, desire to resolve conflict',
    symbolism:
      'The Five of Swords symbolizes conflict, defeat, and hollow victory. It represents the aftermath of battle where even the winner may have lost something important in the process.',
  },
  {
    id: 55,
    name: 'Six of Swords',
    image: '/Cards/Swords06.png',
    suit: 'Swords',
    uprightMeaning: 'Transition, moving on, leaving behind, mental progress',
    reversedMeaning: 'Return to trouble, emotional baggage, unresolved issues',
    symbolism:
      'The Six of Swords represents transition, moving away from turbulence, and gradual healing. It suggests journeying from troubled waters toward calmer shores, though the process may be gradual.',
  },
  {
    id: 56,
    name: 'Seven of Swords',
    image: '/Cards/Swords07.png',
    suit: 'Swords',
    uprightMeaning: 'Deception, strategy, resourcefulness, sneakiness',
    reversedMeaning: 'Confession, conscience, exposure, coming clean',
    symbolism:
      'The Seven of Swords symbolizes deception, strategy, and stealth. It represents trying to get away with something or using clever tactics rather than direct confrontation.',
  },
  {
    id: 57,
    name: 'Eight of Swords',
    image: '/Cards/Swords08.png',
    suit: 'Swords',
    uprightMeaning: 'Restriction, imprisonment, self-victimization, isolation',
    reversedMeaning: 'Freedom, self-acceptance, new perspective',
    symbolism:
      'The Eight of Swords represents restriction, negative thinking, and feeling trapped. It suggests limitations that are largely self-imposed through fear or limiting beliefs.',
  },
  {
    id: 58,
    name: 'Nine of Swords',
    image: '/Cards/Swords09.png',
    suit: 'Swords',
    uprightMeaning: 'Anxiety, worry, fear, depression, nightmares',
    reversedMeaning: 'Inner turmoil, secrets, personal issues',
    symbolism:
      'The Nine of Swords symbolizes anxiety, fear, and mental anguish. It represents the worries that keep you up at night and the tendency to imagine worst-case scenarios.',
  },
  {
    id: 59,
    name: 'Ten of Swords',
    image: '/Cards/Swords10.png',
    suit: 'Swords',
    uprightMeaning: 'Painful endings, deep wounds, betrayal, crisis',
    reversedMeaning: 'Recovery, regeneration, resisting an inevitable end',
    symbolism:
      'The Ten of Swords represents painful endings, defeat, and rock bottom. It suggests a situation that has completely collapsed, but also hints at the possibility that things can only improve from here.',
  },
  {
    id: 60,
    name: 'Page of Swords',
    image: '/Cards/Swords11.png',
    suit: 'Swords',
    uprightMeaning: 'New ideas, curiosity, thirst for knowledge, new ways of communicating',
    reversedMeaning: 'Deception, manipulation, all talk and no action',
    symbolism:
      'The Page of Swords represents intellectual curiosity, communication, and vigilance. It suggests approaching situations with a fresh perspective and eagerness to learn and understand.',
  },
  {
    id: 61,
    name: 'Knight of Swords',
    image: '/Cards/Swords12.png',
    suit: 'Swords',
    uprightMeaning: 'Action, impulsiveness, defending beliefs, truth at all costs',
    reversedMeaning: 'No direction, disregard for consequences, unprepared',
    symbolism:
      'The Knight of Swords symbolizes mental energy, action, and ambition. It represents charging ahead with an idea or argument, often with great speed but sometimes without adequate planning.',
  },
  {
    id: 62,
    name: 'Queen of Swords',
    image: '/Cards/Swords13.png',
    suit: 'Swords',
    uprightMeaning: 'Independent, principled, fair, perceptive, direct communication',
    reversedMeaning: 'Overly emotional, cold-hearted, bitter, resentful',
    symbolism:
      'The Queen of Swords represents clarity, independence, and unbiased judgment. She signifies the ability to cut through deception and confusion with sharp insight and direct communication.',
  },
  {
    id: 63,
    name: 'King of Swords',
    image: '/Cards/Swords14.png',
    suit: 'Swords',
    uprightMeaning: 'Intellectual, authority, clear thinking, truth',
    reversedMeaning: 'Power hungry, manipulative, cruel, harsh',
    symbolism:
      'The King of Swords symbolizes intellectual power, authority, and truth. He represents mastery of the mind, clear thinking, and the ability to make fair and impartial decisions.',
  },

  // Minor Arcana - Pentacles (14 cards)
  {
    id: 64,
    name: 'Ace of Pentacles',
    image: '/Cards/Pentacles01.png',
    suit: 'Pentacles',
    uprightMeaning: 'New financial opportunity, manifestation, abundance',
    reversedMeaning: 'Lost opportunity, lack of planning, scarcity mindset',
    symbolism:
      'The Ace of Pentacles represents material beginnings, prosperity, and manifestation. It suggests new opportunities for abundance and growth in tangible aspects of life.',
  },
  {
    id: 65,
    name: 'Two of Pentacles',
    image: '/Cards/Pentacles02.png',
    suit: 'Pentacles',
    uprightMeaning: 'Balancing resources, adaptation, prioritization',
    reversedMeaning: 'Imbalance, disorganization, overwhelmed',
    symbolism:
      'The Two of Pentacles symbolizes balance, adaptability, and juggling priorities. It represents the need to manage multiple responsibilities or resources with flexibility and skill.',
  },
  {
    id: 66,
    name: 'Three of Pentacles',
    image: '/Cards/Pentacles03.png',
    suit: 'Pentacles',
    uprightMeaning: 'Teamwork, collaboration, learning, implementation',
    reversedMeaning: 'Lack of teamwork, disorganization, lack of skill',
    symbolism:
      'The Three of Pentacles represents mastery, teamwork, and recognition. It suggests working together with others to build something of quality and value.',
  },
  {
    id: 67,
    name: 'Four of Pentacles',
    image: '/Cards/Pentacles04.png',
    suit: 'Pentacles',
    uprightMeaning: 'Security, control, saving money, conservatism',
    reversedMeaning: 'Generosity, giving, spending, insecurity',
    symbolism:
      'The Four of Pentacles symbolizes security, stability, and control. It represents holding tight to what you have, whether for protection or out of fear of loss.',
  },
  {
    id: 68,
    name: 'Five of Pentacles',
    image: '/Cards/Pentacles05.png',
    suit: 'Pentacles',
    uprightMeaning: 'Financial loss, poverty, isolation, worry',
    reversedMeaning: 'Recovery, charity, spiritual wealth',
    symbolism:
      'The Five of Pentacles represents hardship, adversity, and feeling left out in the cold. It suggests material struggle but also reminds us that help is often available if we seek it.',
  },
  {
    id: 69,
    name: 'Six of Pentacles',
    image: '/Cards/Pentacles06.png',
    suit: 'Pentacles',
    uprightMeaning: 'Giving, receiving, sharing wealth, charity, generosity',
    reversedMeaning: 'Selfish, debts, strings attached, stinginess',
    symbolism:
      'The Six of Pentacles symbolizes generosity, charity, and the exchange of resources. It represents the balance between giving and receiving and the circulation of wealth or assistance.',
  },
  {
    id: 70,
    name: 'Seven of Pentacles',
    image: '/Cards/Pentacles07.png',
    suit: 'Pentacles',
    uprightMeaning: 'Assessment, evaluation, reflection, long-term view',
    reversedMeaning: 'Wasted effort, procrastination, unrewarded work',
    symbolism:
      'The Seven of Pentacles represents patience, assessment, and investment. It suggests taking time to evaluate progress and consider whether adjustments are needed for better long-term results.',
  },
  {
    id: 71,
    name: 'Eight of Pentacles',
    image: '/Cards/Pentacles08.png',
    suit: 'Pentacles',
    uprightMeaning: 'Dedication, diligence, quality, craftsmanship',
    reversedMeaning: 'Boredom, perfectionism, carelessness, no ambition',
    symbolism:
      'The Eight of Pentacles symbolizes skill development, diligence, and quality work. It represents the dedication to master a craft or improve abilities through focused and repetitive effort.',
  },
  {
    id: 72,
    name: 'Nine of Pentacles',
    image: '/Cards/Pentacles09.png',
    suit: 'Pentacles',
    uprightMeaning: 'Luxury, self-sufficiency, independence, refinement',
    reversedMeaning: 'Over-dependence, possessiveness, financial setbacks',
    symbolism:
      'The Nine of Pentacles represents self-sufficiency, accomplishment, and refined pleasures. It suggests enjoying the fruits of your labor and the independence that comes from material security.',
  },
  {
    id: 73,
    name: 'Ten of Pentacles',
    image: '/Cards/Pentacles10.png',
    suit: 'Pentacles',
    uprightMeaning: 'Legacy, family wealth, established success, inheritance',
    reversedMeaning: 'Family disputes, lost inheritance, codependency',
    symbolism:
      'The Ten of Pentacles symbolizes legacy, family wealth, and long-term security. It represents the culmination of material efforts that provide lasting comfort and stability across generations.',
  },
  {
    id: 74,
    name: 'Page of Pentacles',
    image: '/Cards/Pentacles11.png',
    suit: 'Pentacles',
    uprightMeaning: 'Ambition, desire to manifest, practicality, learning',
    reversedMeaning: 'Unrealistic goals, impracticality, boredom, laziness',
    symbolism:
      'The Page of Pentacles represents curiosity about material matters, new opportunities, and study. It suggests an eagerness to learn practical skills and explore tangible possibilities.',
  },
  {
    id: 75,
    name: 'Knight of Pentacles',
    image: '/Cards/Pentacles12.png',
    suit: 'Pentacles',
    uprightMeaning: 'Hard work, reliability, thoroughness, responsibility',
    reversedMeaning: 'Boredom, stagnation, excessive perfectionism',
    symbolism:
      'The Knight of Pentacles symbolizes diligence, responsibility, and methodical progress. It represents steady advancement toward goals through reliable effort rather than flashy action.',
  },
  {
    id: 76,
    name: 'Queen of Pentacles',
    image: '/Cards/Pentacles13.png',
    suit: 'Pentacles',
    uprightMeaning: 'Nurturing, practical, provider, security, abundance',
    reversedMeaning: 'Self-centeredness, jealousy, insecurity, materialism',
    symbolism:
      'The Queen of Pentacles represents nurturing abundance, practicality, and down-to-earth wisdom. She signifies the ability to create comfort and security while maintaining a connection to nature and physical wellbeing.',
  },
  {
    id: 77,
    name: 'King of Pentacles',
    image: '/Cards/Pentacles14.png',
    suit: 'Pentacles',
    uprightMeaning: 'Wealth, business, leadership, stability, ambition',
    reversedMeaning: 'Corruption, greed, poor financial decisions',
    symbolism:
      'The King of Pentacles symbolizes material success, abundance, and security. He represents mastery in business or financial matters and the ability to create and maintain prosperity.',
  },
];

// Get a card by ID
export const getCardById = (id: number): TarotCardType | undefined => {
  return TAROT_CARDS.find(card => card.id === id);
};

// Get random cards for readings
export const getRandomCards = (count: number): (TarotCardType & { isReversed: boolean })[] => {
  const shuffled = [...TAROT_CARDS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(card => ({
    ...card,
    isReversed: Math.random() > 0.5,
  }));
};

// Get cards by suit
export const getCardsBySuit = (suit: string): TarotCardType[] => {
  return TAROT_CARDS.filter(card => card.suit === suit);
};

// Get all Major Arcana cards
export const getMajorArcanaCards = (): TarotCardType[] => {
  return TAROT_CARDS.filter(card => !card.suit);
};

// Get all Minor Arcana cards
export const getMinorArcanaCards = (): TarotCardType[] => {
  return TAROT_CARDS.filter(card => !!card.suit);
};
