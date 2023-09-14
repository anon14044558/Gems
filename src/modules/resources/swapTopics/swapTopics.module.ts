import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SwapTopicSchema } from './swapTopics.schema'
import { SwapTopicsService } from './swapTopics.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SwapTopic', schema: SwapTopicSchema }])
  ],
  providers: [SwapTopicsService],
  exports: [SwapTopicsService],
  controllers: []
})
export class SwapTopicModule {}
