import jwt from 'jsonwebtoken';
import  { Request } from 'express';

function verifyAccessToken(req: Request): jwt.JwtPayload | null {
    const token = req.cookies['access_token'];
    if (!token) {
      return null;
    }
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }
  
export { verifyAccessToken };
