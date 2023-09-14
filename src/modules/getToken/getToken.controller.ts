import { Controller, Get, Post, Body } from '@nestjs/common'; 
import { Honey, Token } from './dto/token.schema';
import { GetTokenService } from './getToken.service';
import { TokenInfoDto } from '../resources/tokenInfo/dto/tokenInfo.dto';

@Controller('tokens') 
export class GetTokenController {
  constructor(private readonly getTokenService: GetTokenService) {}

  @Get('get-all')
  async getAllTokens(): Promise<Token[]> {
    return this.getTokenService.getAllTokens();
  }

  @Post('create-token')
  async createTokenAndInfo(@Body() tokenData: Token, @Body() tokenInfoData: TokenInfoDto): Promise<Token> {
    return this.getTokenService.createTokenInfo(tokenData, tokenInfoData);
  }

  @Get('honeypot')
  async checkToken(): Promise<Honey[]> {
    return this.getTokenService.checkToken();
  }
  
}
