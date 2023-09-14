import { Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
export class ExternalsService implements OnModuleInit {
  async onModuleInit() {
    console.log('ExternalsService')
  }

  // Moralis Webhook
  async handleMoralisWebhook(moralisWebhookDto: any) {
    console.log(moralisWebhookDto)

    return 'Succeed'
  }
}
