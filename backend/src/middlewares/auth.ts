import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      errors: ['Authentication required. Please sign in.'],
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({
      success: false,
      errors: ['Invalid or expired token. Please sign in again.'],
    });
    return;
  }

  req.user = {
    _id: decoded.id,
    name: decoded.name,
    email: decoded.email,
  };

  next();
};

export const optionalAuth = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = {
        _id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      };
    }
  }

  next();
};
