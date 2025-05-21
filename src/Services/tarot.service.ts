import axios from 'axios';

// API endpoint configuration
const API_BASE_URL = import.meta.env.API;

// Type definitions for request/response
export type TarotCardPosition = 'upright' | 'reversed';

export interface TarotCardRequest {
  name: string;
  position: TarotCardPosition;
}

export interface TarotReadingRequest {
  question: string;
  cards: TarotCardRequest[];
}

export interface TarotReadingMetadata {
  meaningCard1: string;
  meaningCard2: string;
  meaningCard3: string;
  meaningCard4: string;
  meaningCard5: string;
  overAll: string;
}

export interface TarotReadingResponse {
  message: string;
  status: number;
  metadata: TarotReadingMetadata;
}

export interface SavedReadingResponse {
  id: string;
  savedAt: string;
  interpretation: string;
  question: string;
  cards: TarotCardRequest[];
}

export interface FeedbackRequest {
  name: string;
  age: number;
  content: string;
}

export interface FeedbackResponse {
  message: string;
  status: number;
}

/**
 * Creates a tarot reading by sending card data to the API
 * @param question User's question for the reading
 * @param cards Array of cards with their positions
 * @returns Promise with the interpretation from the API
 */
export const createTarotReading = async (
  question: string,
  cards: TarotCardRequest[],
  age: number,
  name: string,
  isDev: boolean = false
): Promise<TarotReadingResponse> => {
  try {
    const response = await axios.post<TarotReadingResponse>(`${API_BASE_URL}/tarot/reading`, {
      question,
      cards,
      age,
      name,
      isDev,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating tarot reading:', error);
    throw error;
  }
};

/**
 * Saves a completed reading to the user's history
 * @param question User's original question
 * @param cards Array of cards with their positions used in the reading
 * @param interpretation The final interpretation text (either from API or fallback)
 * @returns Promise with the saved reading details including ID
 */
export const saveReading = async (
  question: string,
  cards: TarotCardRequest[],
  interpretation: string,
  cardMeanings?: {
    meaningCard1?: string;
    meaningCard2?: string;
    meaningCard3?: string;
    meaningCard4?: string;
    meaningCard5?: string;
  }
): Promise<SavedReadingResponse> => {
  try {
    const response = await axios.post<SavedReadingResponse>(`${API_BASE_URL}/tarot/reading/save`, {
      question,
      cards,
      interpretation,
      cardMeanings, // Include card meanings if provided
    });

    return response.data;
  } catch (error) {
    console.error('Error saving tarot reading:', error);
    throw error;
  }
};

/**
 * Sends user feedback to the API
 * @param name User's name
 * @param age User's age
 * @param content Feedback content
 * @returns Promise with the feedback response
 */
export const addFeedback = async (
  name: string,
  age: number,
  content: string
): Promise<FeedbackResponse> => {
  try {
    const response = await axios.post<FeedbackResponse>(`${API_BASE_URL}/tarot/add-feedback`, {
      name,
      age,
      content,
    });

    return response.data;
  } catch (error) {
    console.error('Error sending feedback:', error);
    throw error;
  }
};
