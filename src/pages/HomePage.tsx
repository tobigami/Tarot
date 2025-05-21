import { Button } from '@/components/ui/button';
import { ROUTES } from '@/Constant/routes.enum';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">Tarot Reading</h1>

      <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
        <div className="border rounded-md border-purple-600 p-6 text-center flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Random Draw</h2>
          <p className="mb-6">
            Draw random tarot cards and get a personalized reading based on your question.
          </p>
          <Link to={ROUTES.RANDOM_DRAW}>
            <Button size="lg" className="w-full">
              Get Started
            </Button>
          </Link>
        </div>

        {/* <div className="border rounded-lg p-6 text-center flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Custom Reading</h2>
          <p className="mb-6">
            Input your own card selection and get a reading based on your physical cards.
          </p>
          <Link to={ROUTES.CUSTOM_READING}>
            <Button size="lg" className="w-full">
              Get Started
            </Button>
          </Link>
        </div> */}
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h3 className="text-xl font-semibold mb-4">About Tarot Reading</h3>
        <p className="text-lg">
          Welcome to our fun and casual tarot reading experience! Whether you're seeking guidance,
          curious about what the cards might reveal, or just looking for some entertainment, our
          tarot readings offer insights into various aspects of life.
        </p>
        <p className="mt-4 text-lg">
          You can choose to randomly draw cards or input cards you've already drawn physically.
          Either way, we'll provide interpretations to help you reflect on your questions.
        </p>
      </div>
    </div>
  );
}
