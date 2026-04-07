import { lazy, Suspense, type LazyExoticComponent } from 'react';
import type { JSX } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { AppLayout, ErrorBoundary, ProtectedRoute } from '@/components';
import { Skeleton } from '@/components/ui';
import { APP_ROUTES } from '@/utils';

const DashboardPage = lazy(() =>
  import('@/features/dashboard').then((m) => ({ default: m.DashboardPage })),
);
const AdminDashboardPage = lazy(() =>
  import('@/features/admin-dashboard').then((m) => ({ default: m.AdminDashboardPage })),
);
const LoginPage = lazy(() => import('@/features/auth').then((m) => ({ default: m.LoginPage })));
const FetchUrlsPage = lazy(() =>
  import('@/features/fetch-urls').then((m) => ({ default: m.FetchUrlsPage })),
);
const MailPage = lazy(() => import('@/features/mail').then((m) => ({ default: m.MailPage })));
const OrderPage = lazy(() => import('@/features/order').then((m) => ({ default: m.OrderPage })));
const TaskPage = lazy(() => import('@/features/task').then((m) => ({ default: m.TaskPage })));
const ReviewsPage = lazy(() =>
  import('@/features/reviews').then((m) => ({ default: m.ReviewsPage })),
);
const SupportPage = lazy(() =>
  import('@/features/support').then((m) => ({ default: m.SupportPage })),
);
const SettingsPage = lazy(() =>
  import('@/features/settings').then((m) => ({ default: m.SettingsPage })),
);

const lazyElement = (Component: LazyExoticComponent<() => JSX.Element>) => (
  <ErrorBoundary>
    <Suspense fallback={<Skeleton height="12rem" />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

const routes: RouteObject[] = [
  {
    path: APP_ROUTES.login,
    element: lazyElement(LoginPage),
  },
  {
    path: APP_ROUTES.dashboard,
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: lazyElement(DashboardPage) },
      { path: APP_ROUTES.admin.slice(1), element: lazyElement(AdminDashboardPage) },
      { path: APP_ROUTES.fetchUrls.slice(1), element: lazyElement(FetchUrlsPage) },
      { path: APP_ROUTES.mail.slice(1), element: lazyElement(MailPage) },
      { path: APP_ROUTES.order.slice(1), element: lazyElement(OrderPage) },
      { path: APP_ROUTES.task.slice(1), element: lazyElement(TaskPage) },
      { path: APP_ROUTES.reviews.slice(1), element: lazyElement(ReviewsPage) },
      { path: APP_ROUTES.support.slice(1), element: lazyElement(SupportPage) },
      { path: APP_ROUTES.settings.slice(1), element: lazyElement(SettingsPage) },
    ],
  },
];

export const router = createBrowserRouter(routes);
