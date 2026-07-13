import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({
      success: false,
      errors: ['Authentication required. Please sign in.'],
    });
  }
};

export const optionalAuth = (req: Request, _res: Response, next: NextFunction): void => {
  next();
};
