import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthDto } from './dto/auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetMeDto } from './dto/get-me.dto';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  // @ApiProperty()
  @ApiBody({ type: GetMeDto })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/me')
  async getMe(@Body() dto: { token: string }) {
    return this.authService.getMe(dto.token);
  }
}
