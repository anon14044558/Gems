import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ChainSchema } from './chains.schema'
import { ChainsService } from './chains.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chain', schema: ChainSchema }])
  ],
  providers: [ChainsService],
  exports: [ChainsService],
  controllers: []
})
export class ChainsModule {}
