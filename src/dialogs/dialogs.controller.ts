import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DialogsService } from './dialogs.service';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('dialogs')
@Controller('dialogs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService) {}

  @Post()
  create(@Body() dto: CreateDialogDto) {
    return this.dialogsService.create(dto);
  }

  @Get()
  findAll(@Query('userRole') userRole: 'tutor' | 'student', @Query('id') id: string) {
    return this.dialogsService.findAll(userRole, +id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dialogsService.remove(+id);
  }
}
