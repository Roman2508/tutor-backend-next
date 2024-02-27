import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewsEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewsEntity)
    private repository: Repository<ReviewsEntity>,

    @InjectRepository(ReviewsEntity)
    private tutorRepository: Repository<TutorEntity>,
  ) {}

  async create(dto: CreateReviewDto) {
    const reviews = this.repository.create({
      message: dto.message,
      rating: dto.rating,
      sender: { id: dto.sender },
      recipient: { id: dto.recipient },
    });

    const tutor = await this.tutorRepository.findOne({
      where: { id: dto.recipient },
      relations: { reviews: true },
      select: { reviews: { rating: true } },
    });

    if (tutor) {
      const totalRating = tutor.reviews.reduce(
        (acc, curr) => acc + curr.rating,
        0,
      );
      const averageRating = Math.round(totalRating / tutor.reviews.length);

      this.tutorRepository.save({ ...tutor, rating: averageRating });
    }

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
