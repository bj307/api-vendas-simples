import Redis, { Redis as RedisClient } from 'ioredis';
import cache from '@config/cache';

class RedisCach {
  public cliente: RedisClient;
  private connected = false;

  constructor() {
    if (!this.connected) {
      this.cliente = new Redis(cache.config.redis);
      this.connected = true;
    }
  }

  public async save(key: string, value: any): Promise<void> {
    await this.cliente.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.cliente.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.cliente.del(key);
  }
}

export default new RedisCach();
