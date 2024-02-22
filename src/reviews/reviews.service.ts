import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewsEntity } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewsEntity)
    private repository: Repository<ReviewsEntity>,
  ) {}

  create(dto: CreateReviewDto) {
    const reviews = this.repository.create({
      message: dto.message,
      rating: dto.rating,
      sender: { id: dto.sender },
      recipient: { id: dto.recipient },
    });

    return this.repository.save(reviews);
  }

  findAll(id: number) {
    return this.repository.find({
      where: { recipient: { id: id } },
      order: { createdAt: 'ASC' },
    });
  }

  async remove(id: number) {
    const res = await this.repository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException('Відгук не знайдено');
    }

    return id;
  }
}
