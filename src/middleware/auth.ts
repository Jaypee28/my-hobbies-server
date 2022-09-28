import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const AuthMiddleware = function(req: Request | any, res: Response, next: NextFunction){
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify Token
    try {
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
              return res.status(401).json({ msg: 'Token is not valid' });
            } else {
              req.user = decoded.user;
              next();
            }
        });
    } catch (err) {
        console.error('Something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
}