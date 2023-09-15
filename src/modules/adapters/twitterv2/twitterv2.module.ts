// twitterv2.module.ts
import { Module } from '@nestjs/common';
import { TwitterV2Service } from './twitterv2.service';
import { TwitterV2Controller } from './twitterv2.controller';

@Module({
  providers: [TwitterV2Service],
  controllers: [TwitterV2Controller],
  exports: [TwitterV2Service]
})
export class TwitterV2Module {}
