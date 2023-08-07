import { Controller, Get, Post } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Get()
  async find() {
    return await this.cacheService.retrieveData();
  }

  @Post()
  async store() {
    return this.cacheService.storeData();
  }
}
