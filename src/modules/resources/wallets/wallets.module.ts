import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { WalletSchema } from './wallets.schema'
import { WalletsService } from './wallets.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }])
  ],
  providers: [WalletsService],
  exports: [WalletsService],
  controllers: []
})
export class WalletsModule {}
