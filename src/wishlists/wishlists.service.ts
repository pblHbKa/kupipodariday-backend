import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishListRepository: Repository<Wishlist>,
    private wishService: WishesService
  ) {}

  async create(createWishlistDto: CreateWishlistDto, owner: User) {
    const items = await this.wishService.findMany({
      where: { id: In(createWishlistDto.itemsId)}
    });
    return this.wishListRepository.save({...createWishlistDto, owner, items});
  }

  findAll(query: FindManyOptions<Wishlist>) {
    return this.wishListRepository.find(query);
  }

  findOne(query: FindOneOptions<Wishlist>) {
    return this.wishListRepository.findOneOrFail(query);
  }

  findById(id: number) {
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
