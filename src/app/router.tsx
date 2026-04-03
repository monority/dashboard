import { lazy, Suspense } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { AppLayout } from '@/components/layout/AppLayout';
import { Skeleton } from '@/components/ui';
import { APP_ROUTES } from '@/utils';

const DashboardPage = lazy(() => import('@/features/dashboard').then((m) => ({ default: m.DashboardPage })));
const MailPage = lazy(() => import('@/features/mail').then((m) => ({ default: m.MailPage })));
const OrderPage = lazy(() => import('@/features/order').then((m) => ({ default: m.OrderPage })));
const TaskPage = lazy(() => import('@/features/task').then((m) => ({ default: m.TaskPage })));
const ReviewsPage = lazy(() => import('@/features/reviews').then((m) => ({ default: m.ReviewsPage })));
const SupportPage = lazy(() => import('@/features/support').then((m) => ({ default: m.SupportPage })));
const SettingsPage = lazy(() => import('@/features/settings').then((m) => ({ default: m.SettingsPage })));

const lazyElement = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
    <Suspense fallback={<Skeleton height="12rem" />}>
        <Component />
    </Suspense>
);

const routes: RouteObject[] = [
    {
        path: APP_ROUTES.dashboard,
        element: <AppLayout />,
        children: [
            { index: true, element: lazyElement(DashboardPage) },
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
