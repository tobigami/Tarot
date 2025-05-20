import { ROUTES } from '@/Constant/routes.enum';
import { Link } from 'react-router-dom';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to={ROUTES.HOME} className="text-2xl font-bold">
              Tarot Reading
            </Link>

            <nav className="flex space-x-4">
              <Link to={ROUTES.RANDOM_DRAW} className="hover:underline">
                Random Draw
              </Link>
              <Link to={ROUTES.CUSTOM_READING} className="hover:underline">
                Custom Reading
              </Link>
              <Link to={ROUTES.CARD_GALLERY} className="hover:underline">
                Card Gallery
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Tarot Reading App. For entertainment purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
