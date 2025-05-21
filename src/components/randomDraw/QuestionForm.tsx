import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface QuestionFormProps {
  onContinue: (question: string, cardCount: number, name: string, age: number) => void;
}

interface UserInfo {
  name: string;
  age: number;
  question: string;
}

const cardCount = 5;

export default function QuestionForm({ onContinue }: QuestionFormProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [question, setQuestion] = useState('');

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('tarotUserInfo');
    if (savedUserInfo) {
      const userInfo = JSON.parse(savedUserInfo);
      setName(userInfo.name || '');
      setAge(userInfo.age ? String(userInfo.age) : '');
      setQuestion(userInfo.question || '');
    }
  }, []);

  const handleContinue = () => {
    if (name.trim() && age.trim() && question.trim() && Number(age) > 0) {
      // Save user info to localStorage
      const userInfo: UserInfo = {
        name: name.trim(),
        age: Number(age),
        question: question.trim(),
      };
      localStorage.setItem('tarotUserInfo', JSON.stringify(userInfo));

      // Continue to next step
      onContinue(question, cardCount, name.trim(), Number(age));
    }
  };

  // Validate form
  const isFormValid = name.trim() && age.trim() && Number(age) > 0 && question.trim();

  return (
    <div className="space-y-6">
      <div className="bg-purple-900 text-purple-100 p-6 rounded-lg mb-6 shadow-md border border-purple-600">
        <p className="text-lg">
          Focus on your question as you draw the cards. The tarot will provide guidance and insight
          to help you navigate your situation.
        </p>
      </div>

      <div>
        <label htmlFor="name" className="block text-lg font-medium mb-2">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          className="w-full p-3 border border-purple-300 rounded-md bg-purple-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name..."
          required
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-lg font-medium mb-2">
          Your Age <span className="text-red-500">*</span>
        </label>
        <input
          id="age"
          type="number"
          min="1"
          className="w-full p-3 border border-purple-300 rounded-md bg-purple-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
          value={age}
          onChange={e => setAge(e.target.value)}
          placeholder="Enter your age..."
          required
        />
      </div>

      <div>
        <label htmlFor="question" className="block text-lg font-medium mb-2">
          What question would you like to ask? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="question"
          className="w-full p-3 border border-purple-300 rounded-md h-24 bg-purple-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Enter your question here..."
          required
        />
      </div>

      {/* <div>
        <label htmlFor="cardCount" className="block text-lg font-medium mb-2">
          How many cards would you like to draw? (1-5)
        </label>
        <input
          type="number"
          id="cardCount"
          min={1}
          max={5}
          className="w-24 p-3 border border-purple-300 rounded-md bg-purple-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
          value={cardCount}
          onChange={e => setCardCount(Number(e.target.value))}
        />
      </div> */}

      <Button
        size="lg"
        className="w-full mt-6 bg-purple-800 hover:bg-purple-700 text-white"
        onClick={handleContinue}
        disabled={!isFormValid}
      >
        Continue to Card Selection
      </Button>
    </div>
  );
}
