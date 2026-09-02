export class Logger {
  static info(message: string, data?: any): void {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`, data);
  }

  static error(message: string, error?: any): void {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
  }

  static warn(message: string, data?: any): void {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, data);
  }

  static debug(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${new Date().toISOString()}: ${message}`, data);
    }
  }
}

export class PerformanceMonitor {
  private static timers: Map<string, number> = new Map();

  static start(label: string): void {
    this.timers.set(label, performance.now());
  }

  static end(label: string): number {
    const startTime = this.timers.get(label);
    if (!startTime) {
      console.warn(`Timer '${label}' not found`);
      return 0;
    }
    const duration = performance.now() - startTime;
    Logger.debug(`Performance: ${label} took ${duration.toFixed(2)}ms`);
    this.timers.delete(label);
    return duration;
  }
}
