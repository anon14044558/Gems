import { Module } from '@nestjs/common'
import { HoneypotService } from './honeypot.service'
import { HoneypotController } from './honeypot.controller'
import { TwitterV2Service } from '../twitter v2/twitterv2.service'
import { ImageDownloaderService } from '../image-downloader/image-downloader.service'

@Module({
  imports: [],
  providers: [HoneypotService, TwitterV2Service, ImageDownloaderService],
  exports: [HoneypotService],
  controllers: [HoneypotController]
})
export class HoneypotModule {}