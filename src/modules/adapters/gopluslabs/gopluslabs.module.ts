import { Module } from '@nestjs/common';
import { GopluslabsService } from './gopluslabs.service';

@Module({
  providers: [GopluslabsService],
  exports: [GopluslabsService],
})
export class GopluslabsModule {}
