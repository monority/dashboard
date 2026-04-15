type LogLevel = 'info' | 'warn' | 'error' | 'security';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context: Record<string, unknown>;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  security: 0,
  error: 1,
  warn: 2,
  info: 3,
};

class SecurityLogger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  private formatEntry(entry: LogEntry): string {
    const contextStr = entry.context ? ` ${JSON.stringify(entry.context)}` : '';
    return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}${contextStr}`;
  }

  private shouldLog(level: LogLevel): boolean {
    const minLevel = import.meta.env.DEV ? 'info' : 'security';
    return LOG_LEVELS[level] >= LOG_LEVELS[minLevel as LogLevel];
  }

  log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: context ?? {},
    };

    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    if (import.meta.env.DEV) {
      const formatted = this.formatEntry(entry);
      switch (level) {
        case 'security':
          console.warn(formatted);
          break;
        case 'error':
        case 'warn':
          console[level](formatted);
          break;
        default:
          console.log(formatted);
      }
    }
  }

  security(message: string, context?: Record<string, unknown>): void {
    this.log('security', message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.log('error', message, context);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  getSecurityLogs(): LogEntry[] {
    return this.logs.filter((log) => log.level === 'security');
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const securityLogger = new SecurityLogger();

export const logSecurityEvent = (
  event:
    | 'login_attempt'
    | 'login_success'
    | 'login_failed'
    | 'account_locked'
    | 'rate_limit_exceeded',
  data: Record<string, unknown>,
): void => {
  const messages: Record<string, string> = {
    login_attempt: 'Login attempt',
    login_success: 'Login successful',
    login_failed: 'Login failed',
    account_locked: 'Account locked',
    rate_limit_exceeded: 'Rate limit exceeded',
  };

  securityLogger.security(messages[event] ?? event, { event, ...data });
};
