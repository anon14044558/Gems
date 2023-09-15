import { Controller, Get, Query} from '@nestjs/common'
import { HoneypotService } from './honeypot.service'

@Controller('contract')
export class HoneypotController {
  constructor(private readonly honeypotService: HoneypotService) {}

  @Get()
  async yourEndpoint(@Query('tokenAddress') tokenAddress: string) {
    if (!tokenAddress) {
      return 'Missing tokenAddress parameter';
    }

    const result = await this.honeypotService.checkContract(tokenAddress);
    return result;
  }
}
