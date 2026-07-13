declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: number;
        name: string;
        email: string;
      };
    }
  }
}

export {};
