import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SwapTopic } from './swapTopics.interface'
import { TokenInfoDto } from './dto/request.dto'

@Injectable()
export class SwapTopicsService implements OnModuleInit {
  constructor(
    @InjectModel('SwapTopic') private swapTopicModel: Model<SwapTopic>
  ) {}

  async onModuleInit() {
    console.log('SwapTopicsService')
  }

  async getSwapTopics() {
    const swapTopics = await this.swapTopicModel.find({ isEnabled: true })
    const topic0s = []
    swapTopics.map((swapTopic) => {
      topic0s.push(swapTopic.topic)
    })
    return topic0s
  }

  async createSwapTopic(createWalletDto: TokenInfoDto) {
    return this.swapTopicModel.create(createWalletDto)
  }
}
