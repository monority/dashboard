import { Navigate, useLocation } from 'react-router-dom';

import { authStore } from '@/stores';
import { APP_ROUTES } from '@/utils';

interface ProtectedRouteProps {
  children: import('react').ReactNode;
  allowedRoles?: Array<'admin' | 'manager' | 'viewer'>;
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const location = useLocation();
  const user = authStore((state) => state.user);

  if (!user) {
    return <Navigate to={APP_ROUTES.login} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={APP_ROUTES.dashboard} replace />;
  }

  return <>{children}</>;
}
