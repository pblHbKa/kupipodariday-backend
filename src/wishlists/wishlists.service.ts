import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishListRepository: Repository<Wishlist>,
  ) {}

  create(createWishlistDto: CreateWishlistDto, owner: User) {
    return this.wishListRepository.insert({...createWishlistDto, owner});
  }

  findAll() {
    return this.wishListRepository.find();
  }

  findOne(id: number) {
    return this.wishListRepository.findOne({
      where: {
          id: id,
      }
  });
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    updateWishlistDto.id = id;
    return this.wishListRepository.save(updateWishlistDto);
  }

  remove(id: number) {
    this.wishListRepository.delete(id);
  }
}
