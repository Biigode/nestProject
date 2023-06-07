import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../entities/user.entity';

export type UserDocument = HydratedDocument<UserSchema>;

@Schema({ collection: 'users', timestamps: true })
export class UserSchema implements User {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  tasks: Array<{ _id: string }>;
}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
