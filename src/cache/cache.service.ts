import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async retrieveData(): Promise<any> {
    const value = await this.cacheManager.get('key');
    return value;
  }

  async storeData(): Promise<void> {
    await this.cacheManager.set('key', {
      teste: 'teste do bigode',
    },10000);
  }
}
