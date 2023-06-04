import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}
  
  create(createOfferDto: CreateOfferDto) {
    return this.offerRepository.insert(createOfferDto);
  }

  findAll() {
    return this.offerRepository.find();
  }

  findOne(id: number) {
    return this.offerRepository.findOne({
      where: {
          id: id,
      }
  });
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return this.offerRepository.save(updateOfferDto)
  }

  remove(id: number) {
    return this.offerRepository.delete(id);
  }
}
