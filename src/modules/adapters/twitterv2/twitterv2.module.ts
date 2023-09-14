// twitterv2.module.ts
import { Module } from '@nestjs/common';
import { TwitterV2Service } from './twitterv2.service';
import { TwitterV2Controller } from './twitterv2.controller';
import { HoneypotService } from '../honeypot/honeypot.service';
import { HoneypotModule } from '../honeypot/honeypot.module';

@Module({
  providers: [TwitterV2Service],
  controllers: [TwitterV2Controller],
  imports: [HoneypotModule]
})
export class TwitterV2Module {}
