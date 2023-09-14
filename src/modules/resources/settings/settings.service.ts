import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Setting } from './settings.interface'

@Injectable()
export class SettingsService {
  constructor(@InjectModel('Setting') private settingModel: Model<Setting>) {}

  async getSettings() {
    return this.settingModel.findOne()
  }
}
