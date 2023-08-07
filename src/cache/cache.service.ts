import { Injectable } from '@nestjs/common';
import { CreateCacheDto } from './dto/create-cache.dto';
import { UpdateCacheDto } from './dto/update-cache.dto';

@Injectable()
export class CacheService {
  create(createCacheDto: CreateCacheDto) {
    return 'This action adds a new cache';
  }

  findAll() {
    return `This action returns all cache`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cache`;
  }

  update(id: number, updateCacheDto: UpdateCacheDto) {
    return `This action updates a #${id} cache`;
  }

  remove(id: number) {
    return `This action removes a #${id} cache`;
  }
}
