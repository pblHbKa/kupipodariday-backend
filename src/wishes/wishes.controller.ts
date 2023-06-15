import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService,
    private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @AuthUser() user,
    @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto, user);
  }

  @Get('last')
  last() {
    return this.wishesService.last();
  }

  @Get('top')
  top() {
    return this.wishesService.top();
  }

  @Get()
  findAll() {
    return this.wishesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.wishesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.update(id, updateWishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishesService.remove(+id);
  }

  @Post(':id/copy')
  @UseGuards(JwtAuthGuard)
  async copy(@AuthUser() user, @Param('id') id: number) {
    this.wishesService.copy(id);
    this.wishesService.addToUserWishes(user, id);
  }
}
