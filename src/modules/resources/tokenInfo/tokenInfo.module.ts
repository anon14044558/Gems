import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TokenSchema } from './tokenInfo.schema'
import { TokenInfoService } from './tokenInfo.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TokenInfo', schema: TokenSchema }]),
  ],
  providers: [TokenInfoService],
  exports: [TokenInfoService],
  controllers: []
})
export class TokenInfoModule {}
