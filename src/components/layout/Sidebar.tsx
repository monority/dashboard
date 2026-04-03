import { NavLink } from 'react-router-dom';

import { uiStore } from '@/stores';
import { APP_ROUTES } from '@/utils';

const NAV_ITEMS = [
    { label: 'Dashboard', to: APP_ROUTES.dashboard },
    { label: 'Mail', to: APP_ROUTES.mail },
    { label: 'Order', to: APP_ROUTES.order },
    { label: 'Task', to: APP_ROUTES.task },
    { label: 'Reviews', to: APP_ROUTES.reviews },
    { label: 'Support', to: APP_ROUTES.support },
    { label: 'Settings', to: APP_ROUTES.settings },
] as const;

const PREFETCH_LOADERS: Record<string, () => Promise<unknown>> = {
    [APP_ROUTES.dashboard]: () => import('@/features/dashboard'),
    [APP_ROUTES.mail]: () => import('@/features/mail'),
    [APP_ROUTES.order]: () => import('@/features/order'),
    [APP_ROUTES.task]: () => import('@/features/task'),
    [APP_ROUTES.reviews]: () => import('@/features/reviews'),
    [APP_ROUTES.support]: () => import('@/features/support'),
    [APP_ROUTES.settings]: () => import('@/features/settings'),
};

export const Sidebar = () => {
    const isSidebarOpen = uiStore((state) => state.isSidebarOpen);

    const handlePrefetch = (routePath: string) => {
        const loader = PREFETCH_LOADERS[routePath];

        if (loader) {
            void loader();
        }
    };

    return (
        <nav className={`app-sidebar ${isSidebarOpen ? 'is-open' : 'is-collapsed'}`} aria-label="Navigation principale">
            <ul>
                {NAV_ITEMS.map((item) => (
                    <li key={item.to}>
                        <NavLink
                            to={item.to}
                            className={({ isActive }) => (isActive ? 'is-active' : '')}
                            onMouseEnter={() => handlePrefetch(item.to)}
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
