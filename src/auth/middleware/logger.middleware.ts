import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logData = {
      module: 'Auth',
      method: req.method,
      path: req.url,
      headers: req.headers,
      body: req.body,
    };

    console.log(logData);
    next();
  }
}
