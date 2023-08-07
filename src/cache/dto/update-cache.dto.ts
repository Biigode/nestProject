import { PartialType } from '@nestjs/mapped-types';
import { CreateCacheDto } from './create-cache.dto';

export class UpdateCacheDto extends PartialType(CreateCacheDto) {}
