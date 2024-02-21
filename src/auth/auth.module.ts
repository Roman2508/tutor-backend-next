import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorEntity } from 'src/tutors/entities/tutor.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { JwtModule } from '@nestjs/jwt';
import { TutorsModule } from 'src/tutors/tutors.module';
import { StudentModule } from 'src/student/student.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('EXPIRES_IN') },
        };
      },
    }),
    TutorsModule,
    StudentModule,
    TypeOrmModule.forFeature([TutorEntity, StudentEntity]),
  ],
  exports: [AuthService],
})
export class AuthModule {}
