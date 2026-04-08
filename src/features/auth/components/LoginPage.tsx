import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, Button, Input } from '@/components/ui';
import { authStore } from '@/stores';
import { APP_ROUTES } from '@/utils';
import './login.css';

interface LoginCredentials {
  email: string;
  password: string;
}

const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    fullName: 'Admin User',
    role: 'admin' as const,
    permissions: ['all'],
  },
  {
    id: '2',
    email: 'manager@example.com',
    password: 'manager123',
    fullName: 'Manager User',
    role: 'manager' as const,
    permissions: ['read', 'write'],
  },
  {
    id: '3',
    email: 'viewer@example.com',
    password: 'viewer123',
    fullName: 'Viewer User',
    role: 'viewer' as const,
    permissions: ['read'],
  },
];

export function LoginPage() {
  const navigate = useNavigate();
  const setAuth = authStore((state) => state.setAuth);
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: import('react').FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(
      (u) => u.email === credentials.email && u.password === credentials.password,
    );

    if (user) {
      setAuth({
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          permissions: user.permissions.map((p) => ({ code: p, description: p })),
        },
        permissions: user.permissions,
      });
      navigate(APP_ROUTES.admin);
    } else {
      setError('Invalid email or password');
    }

    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <Card className="login-card">
        <h1>Sign In</h1>
        <p className="login-subtitle">Enter your credentials to access the dashboard</p>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email"
            value={credentials.email}
            onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="admin@example.com"
            required
          />
          <Input
            type="password"
            label="Password"
            value={credentials.password}
            onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Enter password"
            required
          />

          {error && <p className="login-error">{error}</p>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="login-hint">
          <p>Demo accounts:</p>
          <ul>
            <li>admin@example.com / admin123</li>
            <li>manager@example.com / manager123</li>
            <li>viewer@example.com / viewer123</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
