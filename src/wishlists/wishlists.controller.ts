import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { AuthUser } from 'src/common/decorators/user.decorator';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  create(@AuthUser() user, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(createWishlistDto, user);
  }

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlistsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistsService.update(id, updateWishlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.wishlistsService.remove(id);
  }
}
