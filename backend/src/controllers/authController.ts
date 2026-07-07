import { Request, Response } from 'express';
import UserAuth from '../models/UserModel';

const ALLOWED_BACK_PATHS = new Set(['/login/index', '/']);
const FALLBACK_URL = '/login/index';

function getSafeBackURL(req: Request): string {
  const referer = req.header('Referer');
  if (!referer) return FALLBACK_URL;

  try {
    const url = new URL(referer);
    return ALLOWED_BACK_PATHS.has(url.pathname) ? url.pathname : FALLBACK_URL;
  } catch {
    return FALLBACK_URL;
  }
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const auth = new UserAuth(req.body);
    await auth.register();

    if (auth.errors.length > 0) {
      req.flash('errors', auth.errors);
      const backURL = getSafeBackURL(req);
      req.session.save(() => res.redirect(backURL));
      return;
    }

    res.redirect(FALLBACK_URL);
  } catch (err) {
    console.error('[register]', err);
    req.session.save(() => res.redirect(FALLBACK_URL));
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const auth = new UserAuth(req.body);
    await auth.login();

    if (auth.errors.length > 0) {
      const backURL = getSafeBackURL(req);
      req.session.save(() => res.redirect(backURL));
      return;
    }

    if (!auth.user) {
      req.session.save(() => res.redirect(FALLBACK_URL));
      return;
    }

    req.session.user = {
      _id: auth.user._id.toString(),
      name: auth.user.name,
      email: auth.user.email,
    };

    req.session.save(() => res.redirect('/'));
  } catch (err) {
    console.error('[login]', err);
    req.session.save(() => res.redirect(FALLBACK_URL));
  }
};

export const logout = (req: Request, res: Response): void => {
  req.session.destroy(() => {
    res.redirect(FALLBACK_URL);
  });
};
