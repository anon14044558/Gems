import { Module } from '@nestjs/common';
import { ImageDownloaderService } from './image-downloader.service';
import { ImageController } from './image-downloader.controller';
import { HoneypotModule } from '../honeypot/honeypot.module';

@Module({
  providers: [ImageDownloaderService],
  controllers: [ImageController],
  imports: [HoneypotModule]
})
export class ImageDownloaderModule {}
