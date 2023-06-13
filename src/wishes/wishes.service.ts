import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) { }

  create(createWishDto: CreateWishDto) {
    return this.wishRepository.insert(createWishDto);
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
    // updateWishDto.id = id;
    return this.wishRepository.save(updateWishDto);
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

  async addToUserWishes(idUser: number, idWish: number) {
    let user = await this.findOne(idUser);
    if(user) {
      this.wishRepository.save({...this.findOne(idWish), owner: user});
    }
  }

}
