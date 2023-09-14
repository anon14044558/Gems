import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ChannelsService } from './channels.service'
import { ChannelSchema } from './channels.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Channel', schema: ChannelSchema }])
  ],
  providers: [ChannelsService],
  exports: [ChannelsService],
  controllers: []
})
export class ChannelsModule {}
