import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Wallet } from './wallets.interface'
import { CreateWalletDto } from './dto/request.dto'

@Injectable()
export class WalletsService implements OnModuleInit {
  constructor(@InjectModel('Wallet') private walletModel: Model<Wallet>) {}

  async onModuleInit() {
    console.log('WalletsService')
  }

  async getWalletByAddress(address: string) {
    return this.walletModel.findOne({ address, isEnabled: true })
  }

  async createWallet(createWalletDto: CreateWalletDto) {
    return this.walletModel.create(createWalletDto)
  }
}
