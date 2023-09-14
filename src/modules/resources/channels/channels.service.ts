import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Channel } from './channels.interface'
import { CreateChannelDto } from './dto/request.dto'

@Injectable()
export class ChannelsService implements OnModuleInit {
  constructor(@InjectModel('Channel') private channelModel: Model<Channel>) {}

  async onModuleInit() {
    console.log('ChannelsService')
  }

  async getChannels() {
    return this.channelModel.find({ isEnabled: true })
  }

  async getChannelById(id: string) {
    return this.channelModel.findById(id)
  }

  async createChanel(createWalletDto: CreateChannelDto) {
    return this.channelModel.create(createWalletDto)
  }
}
