import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CreateCacheDto } from './dto/create-cache.dto';
import { UpdateCacheDto } from './dto/update-cache.dto';

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Post()
  create(@Body() createCacheDto: CreateCacheDto) {
    return this.cacheService.create(createCacheDto);
  }

  @Get()
  findAll() {
    return this.cacheService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cacheService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCacheDto: UpdateCacheDto) {
    return this.cacheService.update(+id, updateCacheDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cacheService.remove(+id);
  }
}
