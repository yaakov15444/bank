import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const now = new Date().toISOString();
    
    console.log(`[${now}] ${method} ${originalUrl}`);

    // Call next() to pass control to the next middleware or route handler
    next();
  }
}