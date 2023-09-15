import { Module } from '@nestjs/common'
import { HoneypotService } from './honeypot.service'
import { HoneypotController } from './honeypot.controller'
import { TwitterV2Service } from '../adapters/twitterv2/twitterv2.service'
import { ImageDownloaderService } from '../adapters/puppeteer/puppeteer.service'
import { DexscreenerService } from '../adapters/dexscreener/dexscreener.service'
import { GopluslabsService } from '../adapters/gopluslabs/gopluslabs.service'
import { RpcService } from '../adapters/rpc/rpc.service'

@Module({
  imports: [],
  providers: [HoneypotService, TwitterV2Service, ImageDownloaderService, DexscreenerService,
    GopluslabsService, RpcService],
  exports: [HoneypotService],
  controllers: [HoneypotController]
})
export class HoneypotModule {}
