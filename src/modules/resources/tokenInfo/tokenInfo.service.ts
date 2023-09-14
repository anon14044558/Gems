import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TokenInfo } from './tokenInfo.interface';
import { TokenInfoDto, updateTokenDto } from './dto/tokenInfo.dto';

@Injectable()
export class TokenInfoService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel('TokenInfo') private readonly tokenInfoModel: Model<TokenInfo>,
  ) {}

  async onModuleInit() {
    console.log('TokenInfoService');
  }

  async saveTokenInfo(tokenInfo: TokenInfoDto) {
    try {
      const newTokenInfo = new this.tokenInfoModel(tokenInfo);
      await newTokenInfo.save();
      console.log('TokenInfo saved:', newTokenInfo);
    } catch (error) {
      console.error('Error', error);
    }
  }

  async updateTokenInfo(address: string, newData: updateTokenDto) {
    try {
      const updateTokenInfo = await this.tokenInfoModel.findOneAndUpdate(
        { address },
        { $set: newData },
        { new: true } )
        .select('-_id -createdAt -updatedAt -__v');

      if (!updateTokenInfo) {
        console.error('Token not found');
        return;
      }

      console.log('Price updated:', updateTokenInfo);
    } catch (error) {
      console.error('Error', error);
    }
  }

  async getTokenInfoByAddress(address: string): Promise<TokenInfo | null> {
    try {
      return await this.tokenInfoModel.findOne({ address }).exec();
    } catch (error) {
      console.error('Error', error);
      return null;
    }
  }

  async getAllTokenInfo(): Promise<TokenInfo[]> {
    try {
      return await this.tokenInfoModel.find().exec();
    } catch (error) {
      console.error('Error', error);
      return [];
    }
  }

  async saveNewTokenInfo(tokenInfo: TokenInfoDto): Promise<TokenInfo> {
    try {
      const createTokenInfo = new this.tokenInfoModel(tokenInfo);
      return await createTokenInfo.save();
    } catch (error) {
      console.error('Error', error);
      return null;
    }
  }
}
