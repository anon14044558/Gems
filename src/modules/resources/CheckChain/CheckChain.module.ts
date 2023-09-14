import { Module } from '@nestjs/common';
import { CheckChainController } from './CheckChain.controller'; 
import { CheckChainService } from './CheckChain.service';

@Module({
  imports: [],
  controllers: [CheckChainController],
  providers: [CheckChainService],
})
export class CheckChainModule {}
