import { Request, Response, NextFunction } from 'express';
import * as redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const limiter = new RateLimiterRedis({
      storeClient: RedisCache.cliente,
      keyPrefix: 'ratelimit',
      points: 5,
      duration: 1,
    });

    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError('Too many requests!', 429);
  }
}
