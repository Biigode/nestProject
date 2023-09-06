import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../entities/user.entity';
import { TaskSchema } from 'src/task/schemas/task.schema';

export type UserDocument = HydratedDocument<UserSchema>;

@Schema({ collection: 'users', timestamps: true })
export class UserSchema implements User {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tasks' }] })
  tasks?: Array<TaskSchema>;
}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
