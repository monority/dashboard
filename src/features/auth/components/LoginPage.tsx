import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, Button, Input } from '@/components/ui';
import { authStore } from '@/stores';
import { APP_ROUTES } from '@/utils';
import { logSecurityEvent } from '@/utils/securityLogger';
import './login.css';

interface LoginCredentials {
  email: string;
  password: string;
}

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;

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
  const [isLocked, setIsLocked] = useState(false);
  const attemptsRef = useRef<{ count: number; lockedUntil: number }>({ count: 0, lockedUntil: 0 });

  const checkLockout = useCallback(() => {
    const now = Date.now();
    if (attemptsRef.current.lockedUntil > now) {
      setIsLocked(true);
      return true;
    }
    if (attemptsRef.current.lockedUntil && attemptsRef.current.lockedUntil <= now) {
      attemptsRef.current = { count: 0, lockedUntil: 0 };
      setIsLocked(false);
    }
    return false;
  }, []);

  const handleSubmit = async (e: import('react').FormEvent) => {
    e.preventDefault();

    if (checkLockout()) {
      const remaining = Math.ceil((attemptsRef.current.lockedUntil - Date.now()) / 1000);
      setError(`Too many attempts. Try again in ${remaining} seconds.`);
      logSecurityEvent('rate_limit_exceeded', {
        email: credentials.email,
        remainingSeconds: remaining,
      });
      return;
    }

    setError(null);
    setIsLoading(true);
    logSecurityEvent('login_attempt', { email: credentials.email });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(
      (u) => u.email === credentials.email && u.password === credentials.password,
    );

    if (user) {
      attemptsRef.current = { count: 0, lockedUntil: 0 };
      logSecurityEvent('login_success', { userId: user.id, email: user.email, role: user.role });
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
      attemptsRef.current.count += 1;
      logSecurityEvent('login_failed', {
        email: credentials.email,
        attemptCount: attemptsRef.current.count,
      });
      if (attemptsRef.current.count >= MAX_LOGIN_ATTEMPTS) {
        attemptsRef.current.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
        setIsLocked(true);
        logSecurityEvent('account_locked', { email: credentials.email });
        setError('Too many failed attempts. Account locked for 15 minutes.');
      } else {
        setError(
          `Invalid email or password. ${MAX_LOGIN_ATTEMPTS - attemptsRef.current.count} attempts remaining.`,
        );
      }
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

          <Button type="submit" disabled={isLoading || isLocked}>
            {isLocked ? 'Account Locked' : isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="login-hint">
          <p>Demo accounts:</p>
          <ul>
            <li>
              <button
                type="button"
                className="demo-account-btn"
                onClick={() => setCredentials({ email: 'admin@example.com', password: 'admin123' })}
              >
                admin@example.com / admin123
              </button>
            </li>
            <li>
              <button
                type="button"
                className="demo-account-btn"
                onClick={() =>
                  setCredentials({ email: 'manager@example.com', password: 'manager123' })
                }
              >
                manager@example.com / manager123
              </button>
            </li>
            <li>
              <button
                type="button"
                className="demo-account-btn"
                onClick={() =>
                  setCredentials({ email: 'viewer@example.com', password: 'viewer123' })
                }
              >
                viewer@example.com / viewer123
              </button>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
