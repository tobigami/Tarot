import MainLayout from '@/Layout/MainLayout';
import CardDetailPage from '@/pages/CardDetailPage';
import CardGalleryPage from '@/pages/CardGalleryPage';
import CustomReadingPage from '@/pages/CustomReadingPage';
import CustomResultsPage from '@/pages/CustomResultsPage';
import HomePage from '@/pages/HomePage';
import RandomDrawPage from '@/pages/RandomDrawPage';
import RandomResultsPage from '@/pages/RandomResultsPage';
import { ROUTES } from '@/Constant/routes.enum';
import { useRoutes } from 'react-router-dom';

export default function AppRoutes() {
  const routes = useRoutes([
    {
      path: ROUTES.HOME,
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
    },
    {
      path: ROUTES.RANDOM_DRAW,
      element: (
        <MainLayout>
          <RandomDrawPage />
        </MainLayout>
      ),
    },
    {
      path: ROUTES.RANDOM_RESULTS,
      element: (
        <MainLayout>
          <RandomResultsPage />
        </MainLayout>
      ),
    },
    {
      path: ROUTES.CUSTOM_READING,
      element: (
        <MainLayout>
          <CustomReadingPage />
        </MainLayout>
      ),
    },
    {
      path: ROUTES.CUSTOM_RESULTS,
      element: (
        <MainLayout>
          <CustomResultsPage />
        </MainLayout>
      ),
    },
    {
      path: ROUTES.CARD_GALLERY,
      element: (
        <MainLayout>
          <CardGalleryPage />
        </MainLayout>
      ),
    },
    {
      path: ROUTES.CARD_DETAIL,
      element: (
        <MainLayout>
          <CardDetailPage />
        </MainLayout>
      ),
    },
  ]);

  return routes;
}
