import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) { }

  create(createWishDto: CreateWishDto, owner) {
    return this.wishRepository.insert({...createWishDto, owner});
  }

  last() {
    return this.wishRepository.find({
      order: {
        createdAt: 'DESC'
      },
      take: 40,
    });
  }

  top() {
    return this.wishRepository.find({
      order: {
        copied: 'DESC'
      },
      take: 20,
    });
  }

  findAll() {
    return this.wishRepository.find();
  }

  findOne(id: number) {
    return this.wishRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    const wish = this.findOne(id);
    return this.wishRepository.save({...wish, ...updateWishDto});
  }

  remove(id: number) {
    this.wishRepository.delete(id);
  }

  async copy(id: number) {
    let wish = await this.wishRepository.findOne({
      where: {
        id: id,
      }
    });

    if(!wish) {
      throw new NotFoundException("Не найден копируемый подарок")
    }
    
    return this.wishRepository.save({...wish, copied: (wish.copied + 1) });
  }

  async addToUserWishes(user: User, idWish: number) {
    const wish = await this.findOne(idWish);
    this.create(wish, user);
  }

  findMany(query: FindManyOptions<Wish>) {
    return this.wishRepository.find(query);
  }

}
