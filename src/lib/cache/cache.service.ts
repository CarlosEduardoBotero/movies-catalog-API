import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL);
  }

  onModuleInit() {
    this.client.on('connect', () => console.log('Connected to Redis'));
    this.client.on('error', (err) => console.error('Redis error', err));
  }

  onModuleDestroy() {
    this.client.quit();
  }

  async setKey(key: string, value: any): Promise<void> {
    // 4 hours in seconds
    await this.client.setex(key, 14400, JSON.stringify(value));
  }

  async getKey(key: string): Promise<string> {
    return await this.client.get(key);
  }

  async getMultiple(keys: string[]): Promise<(string | null)[]> {
    return await this.client.mget(...keys);
  }

  async delete(key: string): Promise<number> {
    return await this.client.del(key);
  }
}
