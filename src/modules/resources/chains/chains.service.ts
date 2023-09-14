import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Chain } from './chains.interface'

@Injectable()
export class ChainsService {
  constructor(@InjectModel('Chain') private chainModel: Model<Chain>) {}

  async getChainByChainId(chainId: number) {
    return this.chainModel.findOne({ chainId })
  }

  async getEnabledScanningChains() {
    return this.chainModel.find({ isEnabled: true, isScanEnabled: true })
  }
}
