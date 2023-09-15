import { Module } from '@nestjs/common';
import { DexscreenerService } from './dexscreener.service';

@Module({
  providers: [DexscreenerService],
  exports: [DexscreenerService],
})
export class DexscreenerModule {}