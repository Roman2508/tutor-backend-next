import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TutorsService } from 'src/tutors/tutors.service';
import { compare } from 'bcryptjs';
import { StudentService } from 'src/student/student.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private tutorService: TutorsService,
    private studentService: StudentService,
    private jwtService: JwtService,
  ) {}

  async issueAccessToken(
    userId: number,
    userRole: 'tutor' | 'student',
  ): Promise<any> {
    const data = { id: userId, userRole };
    return await this.jwtService.signAsync(data, { expiresIn: '30d' });
  }

  async validateUser(dto: LoginDto): Promise<any> {
    let user;

    if (dto.userRole === 'tutor') {
      user = await this.tutorService.findByEmail(dto.email);
    }

    if (dto.userRole === 'student') {
      user = await this.studentService.findByEmail(dto.email);
    }

    const isPasswordsTheSame = await compare(dto.password, user?.password);

    if (!isPasswordsTheSame) {
      throw new UnauthorizedException('Логін або пароль не вірний');
    }

    const { password: _, ...restult } = user;

    return restult;
  }

  async login(dto: LoginDto): Promise<any> {
    const user = await this.validateUser(dto);

    const { password, ...restult } = user;

    return {
      user: { ...restult },
      accessToken: await this.issueAccessToken(user.id, user.userRole),
    };
  }

  async register(dto: AuthDto): Promise<any> {
    let oldUser;

    if (dto.userRole === 'tutor') {
      oldUser = await this.tutorService.findByEmail(dto.email);
    }

    if (dto.userRole === 'student') {
      oldUser = await this.studentService.findByEmail(dto.email);
    }

    if (oldUser) {
      throw new BadRequestException('Такий email вже зареєстрований');
    }

    let newUser;

    if (dto.userRole === 'tutor') {
      newUser = await this.tutorService.create(dto);
    }

    if (dto.userRole === 'student') {
      newUser = await this.studentService.create(dto);
    }

    return {
      user: newUser,
      accessToken: await this.issueAccessToken(newUser.id, newUser.userRole),
    };
  }

  async getMe(token: string) {
    const { id, userRole } = this.jwtService.decode(token);

    if (id && userRole === 'tutor') {
      const user = await this.tutorService.findById(id);
      return user;
    }

    if (id && userRole === 'student') {
      const user = await this.studentService.findById(id);
      return user;
    }

    return null;
  }
}
