import { IsNotEmpty } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserDto extends User {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;
}
