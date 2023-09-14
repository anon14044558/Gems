import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'

import { ExternalsService } from './externals.service'

@Controller()
export class ExternalsController {
  constructor(private externalsService: ExternalsService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('moralis/webhook')
  async handleMoralisWebhook(@Body() moralisWebhookDto) {
    return this.externalsService.handleMoralisWebhook(moralisWebhookDto)
  }
}
