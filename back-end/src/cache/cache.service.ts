import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async retrieveData(bearer: string): Promise<string> {
    const value = await this.cacheManager.get<{ access_token?: string }>(
      bearer,
    );
    return value?.access_token || null;
  }

  async storeData(bearer: string): Promise<void> {
    await this.cacheManager.set(
      bearer,
      {
        access_token: bearer,
      },
      360000000,
    );
  }
}
