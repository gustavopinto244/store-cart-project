import { Request, Response } from 'express';
import UserAuth from '../models/UserModel';
import { generateToken, verifyToken } from '../utils/token';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const auth = new UserAuth(req.body);
    await auth.register();

    if (auth.errors.length > 0) {
      res.status(400).json({ success: false, errors: auth.errors });
      return;
    }

    if (!auth.user) {
      res.status(500).json({ success: false, errors: ['Registration failed. Please try again.'] });
      return;
    }

    const token = generateToken({
      id: auth.user._id,
      name: auth.user.name,
      email: auth.user.email,
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully! You are now signed in.',
      token,
      user: {
        _id: auth.user._id,
        name: auth.user.name,
        email: auth.user.email,
      },
    });
  } catch (err) {
    console.error('[register]', err);
    res.status(500).json({ success: false, errors: ['Internal server error. Please try again later.'] });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const auth = new UserAuth(req.body);
    await auth.login();

    if (auth.errors.length > 0) {
      res.status(400).json({ success: false, errors: auth.errors });
      return;
    }

    if (!auth.user) {
      res.status(500).json({ success: false, errors: ['Login failed. Please try again.'] });
      return;
    }

    const token = generateToken({
      id: auth.user._id,
      name: auth.user.name,
      email: auth.user.email,
    });

    res.json({
      success: true,
      message: 'Welcome back! You are now signed in.',
      token,
      user: {
        _id: auth.user._id,
        name: auth.user.name,
        email: auth.user.email,
      },
    });
  } catch (err) {
    console.error('[login]', err);
    res.status(500).json({ success: false, errors: ['Internal server error. Please try again later.'] });
  }
};

export const logout = (_req: Request, res: Response): void => {
  res.json({
    success: true,
    message: 'You have been signed out.',
  });
};

export const me = (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.json({ authenticated: false, user: null });
    return;
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    res.json({ authenticated: false, user: null });
    return;
  }

  res.json({
    authenticated: true,
    user: {
      _id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    },
  });
};
