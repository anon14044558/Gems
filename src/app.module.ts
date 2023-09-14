import { Module } from '@nestjs/common'
import { loadConfig } from '@/config'
import { DatabaseModule } from './modules/database/database.module'
import { ExternalsModule } from './modules/aggregators/externals/externals.module'
import { TokenInfoModule } from './modules/resources/tokenInfo/tokenInfo.module'
import { DextoolsModule } from './modules/adapters/dextools/dextools.module'
import { TaskModule } from './modules/task/task.module'
import { GetTokenModule } from './modules/getToken/getToken.module' 
import { HoneypotModule } from './modules/adapters/honeypot/honeypot.module'
import { CheckTokenModule } from './modules/resources/checkToken/checkToken.module'
import { TxCountModule } from './modules/adapters/TxCount/TxCount.module'
import { BlockchainModule } from './modules/adapters/Count/blockchain.module'
import { TaskService } from './modules/task/task.service'
import { GetSocialModule } from './modules/adapters/getSocial/getSocial.module'
import { CheckChainModule } from './modules/resources/CheckChain/CheckChain.module'
import { TwitterV2Module } from './modules/adapters/twitterv2/twitterv2.module'
import { TradingViewModule } from './modules/adapters/tradingView/tradingview.module'
import { ImageDownloaderModule } from './modules/adapters/puppeteer/puppeteer.module'


@Module({
  imports: [loadConfig(), ImageDownloaderModule, HoneypotModule, TwitterV2Module],
})
export class AppModule {}
