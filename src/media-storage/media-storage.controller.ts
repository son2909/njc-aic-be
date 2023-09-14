import { Controller, Get, Query } from '@nestjs/common';
import { GetSignedUrlDTO } from './dto/media-storage.dto';
import { MediaStorageService } from './media-storage.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Controller('media-storage')
@ApiTags('Media')
@ApiBearerAuth()
export class MediaStorageController {
  constructor(
    private readonly mediaStorageService: MediaStorageService,
    private readonly config: ConfigService,
  ) {}

  /**
   *
   * @param payload
   * @returns
   */
  @Get('presignUrl')
  async getSignUrl(
    @Query() payload: GetSignedUrlDTO,
  ): Promise<{ url: string; key: string }> {
    const key = `${this.config.get<string>('S3_PREFIX')}/${payload.fileName}`;
    return this.mediaStorageService.signedPutObject(
      key,
      payload.contentType,
      payload.fileName,
    );
  }
}
