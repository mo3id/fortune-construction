import { Request, Response, NextFunction } from 'express';
import { verifyAuthToken } from '../config/jwt';

export interface AuthRequest extends Request {
  adminId?: string;
}

export function protect(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  const match = typeof header === 'string' ? header.match(/^Bearer\s+(\S+)$/i) : null;
  if (!match) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = verifyAuthToken(match[1]);
    req.adminId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
