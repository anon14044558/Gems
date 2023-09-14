import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { TokenInfoModule } from '../resources/tokenInfo/tokenInfo.module';
import { DextoolsModule } from '../adapters/dextools/dextools.module';
import { GetTokenModule } from '../getToken/getToken.module';
import { HoneypotModule } from '../adapters/honeypot/honeypot.module';
import { CheckTokenModule } from '../resources/checkToken/checkToken.module';
import { TxCountModule } from '../adapters/TxCount/TxCount.module';
import { BlockchainModule } from '../adapters/Count/blockchain.module';

@Module({
  imports: [ConfigModule, TokenInfoModule, ScheduleModule.forRoot(),
  HoneypotModule, CheckTokenModule],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
