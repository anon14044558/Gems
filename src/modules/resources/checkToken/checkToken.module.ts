import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { checkTokenSchema } from './checkToken.schema'
import { CheckTokenService } from './checkToken.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CheckTokenInfo', schema: checkTokenSchema }]),
  ],
  providers: [CheckTokenService],
  exports: [CheckTokenService],
  controllers: []
})
export class CheckTokenModule {}
