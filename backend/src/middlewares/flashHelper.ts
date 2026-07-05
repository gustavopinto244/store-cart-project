import { Request } from 'express';

export const setFlashMessage = (
  req: Request,
  type: 'success' | 'error' | 'info',
  message: string
) => {
  req.flash(type, message);
};

export const getFlashMessages = (req: Request) => ({
  success: req.flash('success'),
  error: req.flash('error'),
  info: req.flash('info'),
});