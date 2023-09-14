import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CheckTokenInfo } from './checkToken.interface';
import { checkTokenDto } from './dto/checkToken.dto';

@Injectable()
export class CheckTokenService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel('CheckTokenInfo') private readonly tokenInfoModel: Model<CheckTokenInfo>,
  ) {}

  async onModuleInit() {
    console.log('CheckTokenService');
  }

  async saveTokenInfo(tokenInfo: checkTokenDto) {
    try {
      const newTokenInfo = new this.tokenInfoModel(tokenInfo);
      await newTokenInfo.save();
      const savedTokenInfo = await this.tokenInfoModel
        .findById(newTokenInfo._id)
        .select('-_id -createdAt -updatedAt -__v')
        .lean();
      console.log('TokenInfo saved:', savedTokenInfo);
    } catch (error) {
      console.error('Error', error);
    }
  }
  
  async getAllTokenInfo(): Promise<CheckTokenInfo[]> {
    try {
      return await this.tokenInfoModel.find().exec();
    } catch (error) {
      console.error('Error', error);
      return [];
    }
  }

}
