import { Injectable } from '@nestjs/common';
import { UserRepository } from './../user.repository';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private UserRepository: UserRepository) {}
  async validate(value: any): Promise<boolean> {
    const userExistsWithEmail =
      await this.UserRepository.existsWithEmail(value);

    return !userExistsWithEmail;
  }
}

export const emailIsUnique = (validationOptions: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  return (object: Object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: EmailIsUniqueValidator,
    });
  };
};
