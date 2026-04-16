import { Outlet } from 'react-router-dom';

import { useRouteMetadata } from '@/app/useRouteMetadata';
import { Header, Shell, Sidebar } from '@/components';

export const AppLayout = () => {
  useRouteMetadata();

  return (
    <Shell sidebar={<Sidebar />} header={<Header />}>
      <main>
        <Outlet />
      </main>
    </Shell>
  );
};

AppLayout.displayName = 'AppLayout';
