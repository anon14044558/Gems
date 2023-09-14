import { Controller, Get, Query } from '@nestjs/common';
import { CheckChainService } from './CheckChain.service';

@Controller('contract')
export class CheckChainController {
  constructor(
    private readonly contractService: CheckChainService,
  ) {}

  @Get('check')
  async checkContract(@Query('address') address: string) {
    const chains = [
      { name: 'Ethereum', apiUrl: 'https://api.etherscan.io/api' },
      { name: 'BSC', apiUrl: 'https://api.bscscan.com/api' },
      { name: 'Polygon', apiUrl: 'https://api.polygonscan.com/api' },
      { name: 'Arbitrum', apiUrl: 'https://api.arbiscan.io/api' }
    ];

    const detectedChains = [];

    for (const chain of chains) {
      const isValid = await this.contractService.isContractValidOnChain(address, chain.apiUrl);
      if (isValid) {
        detectedChains.push(chain.name);
      }
    }

    if (detectedChains.length === 0) {
      throw new Error('Unsupported Chain');
    }

    const Chain = detectedChains[0];

    const socialLinks = await this.contractService.getSocialLinksFromContract(address, Chain);
    return { socialLinks, chain: Chain };
  }
}
