type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
}

/**
 * Custom logger with environment-aware behavior
 */
class Logger {
  private isDevelopment = import.meta.env.DEV;

  private log(level: LogLevel, message: string, data?: unknown) {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
    };

    if (this.isDevelopment) {
      console[level](message, data);
    }

    // In production, you might want to send logs to a service
    if (!this.isDevelopment && level === 'error') {
      // Implement production error logging here
      // e.g., send to error tracking service
    }

    return entry;
  }

  info(message: string, data?: unknown) {
    return this.log('info', message, data);
  }

  warn(message: string, data?: unknown) {
    return this.log('warn', message, data);
  }

  error(message: string, data?: unknown) {
    return this.log('error', message, data);
  }
}

export const logger = new Logger();