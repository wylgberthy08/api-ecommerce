import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { emailIsUnique } from '../validations/email-is-unique.validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @emailIsUnique({
    message: 'Email already exists',
  })
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
