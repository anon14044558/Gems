import { Module } from '@nestjs/common';
import { ImageDownloaderService } from './puppeteer.service';
import { ImageController } from './puppeteer.controller';

@Module({
  providers: [ImageDownloaderService],
  exports: [ImageDownloaderService],
  controllers: [ImageController]
})
export class ImageDownloaderModule {}
