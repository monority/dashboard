import { NavLink } from 'react-router-dom';

import { Button } from '@/components/ui';
import { uiStore } from '@/stores';
import { APP_ROUTES } from '@/utils';

import { LAYOUT_COPY, LAYOUT_NAV_ITEMS } from './display';

const PREFETCH_LOADERS: Record<string, () => Promise<unknown>> = {
  [APP_ROUTES.dashboard]: () => import('@/features/dashboard'),
  [APP_ROUTES.admin]: () => import('@/features/admin-dashboard'),
  [APP_ROUTES.fetchUrls]: () => import('@/features/fetch-urls'),
  [APP_ROUTES.mail]: () => import('@/features/mail'),
  [APP_ROUTES.order]: () => import('@/features/order'),
  [APP_ROUTES.task]: () => import('@/features/task'),
  [APP_ROUTES.reviews]: () => import('@/features/reviews'),
  [APP_ROUTES.support]: () => import('@/features/support'),
  [APP_ROUTES.settings]: () => import('@/features/settings'),
};

export const Sidebar = () => {
  const isSidebarOpen = uiStore((state) => state.isSidebarOpen);
  const toggleSidebar = uiStore((state) => state.toggleSidebar);

  const handlePrefetch = (routePath: string) => {
    const loader = PREFETCH_LOADERS[routePath];

    if (loader) {
      void loader();
    }
  };

  return (
    <nav
      className={`app-sidebar ${isSidebarOpen ? 'is-open' : 'is-collapsed'}`}
      aria-label="Navigation principale"
    >
      <header className="app-sidebar__header">
        <strong>{LAYOUT_COPY.sidebarTitle}</strong>
        <span>{LAYOUT_COPY.sidebarSubtitle}</span>
      </header>

      <ul className="app-sidebar__list">
        {LAYOUT_NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              onMouseEnter={() => handlePrefetch(item.to)}
              onFocus={() => handlePrefetch(item.to)}
              title={item.label}
              aria-label={`${item.label}: ${item.description}`}
            >
              <span className="app-sidebar__icon" aria-hidden="true">
                {item.code}
              </span>
              <span className="app-sidebar__text">
                <span className="app-sidebar__label">{item.label}</span>
                <span className="app-sidebar__meta">{item.description}</span>
              </span>
              <span className="app-sidebar__shortcut" aria-hidden="true">
                {item.shortcut}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      <footer className="app-sidebar__footer">
        <Button
          variant="ghost"
          onClick={toggleSidebar}
          aria-label="Replier ou ouvrir la navigation"
        >
          {isSidebarOpen ? LAYOUT_COPY.sidebarCollapse : LAYOUT_COPY.sidebarOpen}
        </Button>
      </footer>
    </nav>
  );
};

Sidebar.displayName = 'Sidebar';
