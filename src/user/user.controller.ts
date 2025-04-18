import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { UserListDto } from './dto/UserList.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) { }
  @Post()
  createUser(@Body() userData: CreateUserDto) {
    const userEntity = new UserEntity();
    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.id = uuid();

    this.userRepository.save(userEntity);
    return {
      user: new UserListDto(
        userEntity.id,  
        userEntity.name,
      ),
      message: 'Usuário criado com sucesso',
    }
  }

  @Get()
  async getAllUsers() {
    const savedUsers = await this.userRepository.list();
    const usersList = savedUsers.map(
      user => new UserListDto(
        user.id,
        user.name,
      )
    )
    return usersList;
  }
@Put('/:id')
  async updateUser(@Param('id') id:string, @Body() newData:UpdateUserDto){
   const updatedUser = await this.userRepository.update(id, newData);
   
   return {
    user: updatedUser,
    message: 'Usuário atualizado com sucesso',
   }
  }
 @Delete('/:id')
  async removeUser(@Param('id') id:string){
    const userRemoved = await this.userRepository.remove(id);

    return {
      user: userRemoved,
      message: 'Usuário removido com sucesso',
    }
  }
}
