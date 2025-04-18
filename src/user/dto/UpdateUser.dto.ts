import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { emailIsUnique } from '../validations/email-is-unique.validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsOptional()
  name: string;
  
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @emailIsUnique({
    message: 'Email already exists',
  })
  @IsOptional()
  email: string;

  @MinLength(6)
  @IsOptional()
  password: string;
}
