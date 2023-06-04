import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  create(createWishDto: CreateWishDto) {
    return this.wishRepository.insert(createWishDto);
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
}
