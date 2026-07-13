import { Request, Response } from 'express';
import UserAuth from '../models/UserModel';

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

    res.json({
      success: true,
      message: 'Account created successfully! You can now sign in.',
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

    req.session.user = {
      _id: auth.user._id.toString(),
      name: auth.user.name,
      email: auth.user.email,
    };

    req.session.save(() => {
      res.json({
        success: true,
        message: 'Welcome back! You are now signed in.',
      });
    });
  } catch (err) {
    console.error('[login]', err);
    res.status(500).json({ success: false, errors: ['Internal server error. Please try again later.'] });
  }
};

export const logout = (req: Request, res: Response): void => {
  req.session.destroy(() => {
    res.json({
      success: true,
      message: 'You have been signed out.',
    });
  });
};

export const me = (req: Request, res: Response): void => {
  if (req.session.user) {
    res.json({
      authenticated: true,
      user: req.session.user,
    });
  } else {
    res.json({
      authenticated: false,
      user: null,
    });
  }
};
