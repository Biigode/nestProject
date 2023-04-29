import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [CarsModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
