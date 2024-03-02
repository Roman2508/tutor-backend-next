const fs = require('fs');
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
  Headers,
  Res,
  StreamableFile,
  BadRequestException,
  Header,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { fileStorage } from './storate';
import { FilesService } from './files.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Observable, of } from 'rxjs';
import { join } from 'path';

@Controller('files')
@ApiTags('files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
    @Headers() headers: any,
  ) {
    return this.filesService.uploadAvatar(file, headers);
  }

  // @Get('profile-image/:imagename')
  // findProfileImage(
  //   @Param('imagename') imagename: string,
  //   @Res() res: any,
  // ): Observable<Object> {
  //   return of(res.sendFile(join(process.cwd(), 'uploads/' + imagename)));
  // }

  /*  */

  @Post(':lessonId')
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
    @Headers() headers: any,
    @Param('lessonId') lessonId: string,
  ) {
    return this.filesService.create(file, headers, +lessonId);
  }

  @Get('/download/:filename')
  @Header('Content-Type', 'multipart/form-data')
  getFile(@Param('filename') filename: string): StreamableFile {
    const file = fs.createReadStream(`uploads/${filename}`);
    return new StreamableFile(file);
  }

  @Get(':lessonId')
  findAll(@Param('lessonId') lessonId: string) {
    return this.filesService.findAll(+lessonId);
  }

  @Delete(':filename/:id')
  remove(@Param('filename') filename: string, @Param('id') id: string) {
    return this.filesService.remove(filename, +id);
  }
}
