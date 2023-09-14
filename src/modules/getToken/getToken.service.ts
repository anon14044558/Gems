import { Injectable } from '@nestjs/common';
import { TokenInfoService } from '../resources/tokenInfo/tokenInfo.service';
import { Honey, Token } from './dto/token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenInfoDto } from '../resources/tokenInfo/dto/tokenInfo.dto';
import { CheckTokenService } from '../resources/checkToken/checkToken.service';
import { checkTokenDto } from '../resources/checkToken/dto/checkToken.dto';

@Injectable()
export class GetTokenService {
  constructor(
    private readonly tokenInfoService: TokenInfoService,
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
    private readonly checkTokenService: CheckTokenService,
  ) {}

  async getAllTokens(): Promise<Token[]> {
    try {
      const getTokenData = await this.tokenInfoService.getAllTokenInfo();
      return getTokenData.map(info => ({
        refAddress: info.refAddress,
        refName: info.refName,
        refSymbol: info.refSymbol,
        symbol: info.refSymbol, 
        name: info.refName,
        address: info.address,
        exchange: info.exchange,
        dextScore: info.dextScore,
        price: info.price,
      }));
    } catch (error) {
      console.error('Error', error);
      return [];
    }
  }

  async checkToken(): Promise<Honey[]> {
  try {
    const checkTokenData = await this.checkTokenService.getAllTokenInfo();
    return checkTokenData.map(info => ({
      holders: info.holders,
      buyTax: info.buyTax,
      sellTax: info.sellTax,
      codeVerified: info.codeVerified,
      renounced: info.renounced,
      isHoneypot: info.isHoneypot,
    }));
  } catch (error) {
    console.error('Error', error);
    return [];
  }
}




  async createTokenInfo(tokenData: Token, tokenInfoData: TokenInfoDto): Promise<Token> {
    const newToken = new this.tokenModel(tokenData);
    const savedToken = await newToken.save();

    const newTokenInfo = new TokenInfoDto();
    newTokenInfo.chainName = tokenInfoData.chainName;
    newTokenInfo.address = tokenData.address;
    newTokenInfo.exchange = tokenInfoData.exchange;
    newTokenInfo.dextScore = tokenInfoData.dextScore;
    newTokenInfo.price = tokenInfoData.price;
    newTokenInfo.refAddress = tokenInfoData.refAddress;
    newTokenInfo.refName = tokenInfoData.refName;
    newTokenInfo.refSymbol = tokenInfoData.refSymbol;

    await this.tokenInfoService.saveNewTokenInfo(newTokenInfo);

    return savedToken;
  }
}
