import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishListRepository: Repository<Wishlist>,
  ) {}

  create(createWishlistDto: CreateWishlistDto) {
    return this.wishListRepository.insert(createWishlistDto);
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
