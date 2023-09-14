import { Controller, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DextoolsService } from '../adapters/dextools/dextools.service';
import { TokenInfoService } from '../resources/tokenInfo/tokenInfo.service';
import { TokenInfoDto } from '../resources/tokenInfo/dto/tokenInfo.dto';
import { HoneypotService } from '../adapters/honeypot/honeypot.service';
import { checkTokenDto } from '../resources/checkToken/dto/checkToken.dto';
import { CheckTokenService } from '../resources/checkToken/checkToken.service';
import { TxCountService } from '../adapters/TxCount/TxCount.service';
import { chain } from 'lodash';

@Injectable()
export class TaskService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly dextoolsService: DextoolsService,
    private readonly tokenInfoService: TokenInfoService,
    private readonly honeypotService: HoneypotService,
    private readonly checkTokenService: CheckTokenService,
    private readonly txcountService: TxCountService,
  ) {}

  async onModuleInit() {
    console.log('TaskService');
    // await this.txCount();
  }

//   async checkToken() {
//   const chainId = 'Ethereum';
//   const tokenAddress = '0x38CF11283de05cF1823b7804bC75068bd6296957';

//   try {
//     const honeyPotData = await this.honeypotService.checkToken(chainId, tokenAddress);
//     console.log('HoneyPotData:', honeyPotData);


//     const tokenInfo: checkTokenDto = {
//       chainId: chainId,
//       holders: honeyPotData.holders,
//       buyTax: honeyPotData.buyTax,
//       sellTax: honeyPotData.sellTax,
//       codeVerified: honeyPotData.codeVerified,
//       renounced: honeyPotData.renounced,
//       isHoneypot: honeyPotData.isHoneypot,
//       tokenAddress: tokenAddress,
//     };

//     await this.checkTokenService.saveTokenInfo(tokenInfo);
//     console.log('TokenInfo saved');

//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// async txCount() {
//   const chainName = '0x1';
//   const from_block = 17917770;
//   const to_block = 17917775;

//   try {
//     const txCountData = await this.txcountService.TxCount(chainName, from_block, to_block);
//     console.log('txCountData:', txCountData);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

}