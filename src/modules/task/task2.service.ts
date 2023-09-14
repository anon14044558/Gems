import { Controller, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DextoolsService } from '../adapters/dextools/dextools.service';
import { TokenInfoService } from '../resources/tokenInfo/tokenInfo.service';
import { TokenInfoDto } from '../resources/tokenInfo/dto/tokenInfo.dto';
import { HoneypotService } from '../adapters/honeypot/honeypot.service';
import { checkTokenDto } from '../resources/checkToken/dto/checkToken.dto';
import { CheckTokenService } from '../resources/checkToken/checkToken.service';

@Injectable()
export class Task2Service implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly dextoolsService: DextoolsService,
    private readonly tokenInfoService: TokenInfoService,
    private readonly honeypotService: HoneypotService,
    private readonly checkTokenService: CheckTokenService,
  ) {}

  async onModuleInit() {
    console.log('TaskService');
  }
  
  @Cron(CronExpression.EVERY_10_SECONDS)
  async insertTokenInfo() {
    console.log('TokenInfo');
    
    const chainName = 'Ethereum';
    const tokenAddress = '0x046eee2cc3188071c02bfc1745a6b17c656e3f3d';

    try {
      const tokenData = await this.dextoolsService.getToken(chainName, tokenAddress);

      const newTokenInfo: TokenInfoDto = {
        chainName: chainName,
        address: tokenData.address,
        exchange: tokenData.exchange,
        dextScore: tokenData.dextScore,
        price: tokenData.price,
        refAddress: tokenData.tokenRef.address,
        refName: tokenData.tokenRef.name,
        refSymbol: tokenData.tokenRef.symbol,
      };

      const existingTokenInfo = await this.tokenInfoService.getTokenInfoByAddress(tokenData.address);

      if (existingTokenInfo) {
        await this.tokenInfoService.updateTokenInfo(tokenData.address, {
          dextScore: tokenData.dextScore,
          price: tokenData.price,
        });
        console.log('TokenInfo updated');
      } else {
        await this.tokenInfoService.saveTokenInfo(newTokenInfo);
        console.log('TokenInfo saved');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}