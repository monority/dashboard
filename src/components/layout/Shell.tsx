import type { ReactNode } from 'react';

import { uiStore } from '@/stores';

interface ShellProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

export const Shell = ({ sidebar, header, children }: ShellProps) => {
  const isSidebarOpen = uiStore((state) => state.isSidebarOpen);

  return (
    <div className={`app-shell ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      <a className="app-skip-link" href="#main-content" rel="noopener noreferrer">
        Aller au contenu principal
      </a>
      <aside className="app-shell__sidebar">{sidebar}</aside>
      <div className="app-shell__main">
        <header id="header-container" className="app-shell__header">
          {header}
        </header>
        <main id="main-content" className="app-shell__content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
};

Shell.displayName = 'Shell';
