import { Module } from '@nestjs/common'
import { loadConfig } from '@/config'
import { DatabaseModule } from './modules/database/database.module'
import { ExternalsModule } from './modules/aggregators/externals/externals.module'
import { TokenInfoModule } from './modules/resources/tokenInfo/tokenInfo.module'
import { GetTokenModule } from './modules/getToken/getToken.module' 
import { HoneypotModule } from './modules/honeypot/honeypot.module'



@Module({
  imports: [loadConfig(), HoneypotModule],
})
export class AppModule {}
