import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema, TaskSchemaFactory } from 'src/task/schemas/task.schema';
import { UserSchema, UserSchemaFactory } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserSchemaFactory },
    ]),
    MongooseModule.forFeature([
      { name: TaskSchema.name, schema: TaskSchemaFactory },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
