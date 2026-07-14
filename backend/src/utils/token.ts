import jwt, { type JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  id: number;
  email: string;
  name: string;
}

export const generateToken = (payload: Omit<TokenPayload, keyof JwtPayload>): string => {
  const secret = process.env.JWT_SECRET as string;
  const expiration = process.env.JWT_EXPIRATION || '7d';
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign(payload, secret, { expiresIn: expiration });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const secret = process.env.JWT_SECRET as string;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.verify(token, secret) as TokenPayload;
  } catch {
    return null;
  }
};
