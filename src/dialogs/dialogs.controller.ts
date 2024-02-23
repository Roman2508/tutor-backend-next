import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DialogsService } from './dialogs.service';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('dialogs')
@Controller('dialogs')
export class DialogsController {
  constructor(private readonly dialogsService: DialogsService) {}

  @Post()
  create(@Body() dto: CreateDialogDto) {
    return this.dialogsService.create(dto);
  }

  @Get()
  findAll() {
    return this.dialogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dialogsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dialogsService.remove(+id);
  }
}
