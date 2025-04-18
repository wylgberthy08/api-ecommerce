import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];
  save(user: UserEntity) {
    this.users.push(user);
  }

  list(): any[] {
    return this.users || [];
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async existsWithEmail(email: string) {
    const possiblerUser = this.users.find((user) => user.email === email);
    return possiblerUser !== undefined;
  }

  private searchById(id:string){
    const possiblerUser = this.users.find(
      userSaved => userSaved.id === id
  );

  if(!possiblerUser) {
      throw new Error('Usuário não existe');
  }

  return possiblerUser;
  }

  async update(id:string, dataToUpdate: Partial<UserEntity>){
    const user = this.searchById(id)

   

    Object.entries(dataToUpdate).forEach(
      ([key, value]) => {
        if(key === 'id'){
          return;
        }
        user[key] = value;

      }
    )
    return user;
  }

  async remove(id:string){
    const user = this.searchById(id)

    this.users =  this.users.filter(
      userSaved => userSaved.id !== id
    )
    return user;
  }
}
