import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Like } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  findMe(@AuthUser() user): Promise<User> {
    return this.usersService.findById(user.id);
  }

  @Get(':username')
  findUsername(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne({
      select: {username: true, about: true, id: true, avatar: true, createdAt: true, updatedAt: true},
      where: {username}
    });
  }

  @Patch('me')
  updateMe(
    @AuthUser() user,
    @Body() updateUserDto: UpdateUserDto) {
      const { id } = user;
    return this.usersService.update(id, updateUserDto);
  }

  @Post('find')
  async findMany(@Body() body: {query: string}) {
    let users = await this.usersService.findMany({
      select: {username: true, about: true, id: true, avatar: true, createdAt: true, updatedAt: true, email: true},
      where: {email: Like(`%${body.query}%`)}
    });
    users = users.concat(await this.usersService.findMany({
      select: {username: true, about: true, id: true, avatar: true, createdAt: true, updatedAt: true, email: true},
      where: {username: Like(`%${body.query}%`)}
    }));
    return users;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
