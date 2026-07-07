import 'express-session';

declare module 'express-serve-static-core' {
  interface Request {
    flash(type: string, message: string | string[]): void;
    flash(type: string): string[];
    flash(): Record<string, string[]>;
  }
}

declare module 'express-session' {
  interface SessionData {
    user?: {
      _id: string;
      name: string;
      email: string;
    };
  }
}

export {};