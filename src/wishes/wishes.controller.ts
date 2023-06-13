import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { UsersService } from 'src/users/users.service';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService,
    private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
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
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.update(+id, updateWishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishesService.remove(+id);
  }

  @Post(':id/copy')
  copy(@AuthUser() user, @Param('id') id: number) {
    this.wishesService.copy(id);
    this.wishesService.addToUserWishes(user.id, id);
  }
}
