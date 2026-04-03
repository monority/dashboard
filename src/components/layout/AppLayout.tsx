import { Outlet } from 'react-router-dom';

import { Header, Shell, Sidebar } from '@/components';

export const AppLayout = () => {
    return <Shell sidebar={<Sidebar />} header={<Header />}><Outlet /></Shell>;
};
