import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fetch from 'node-fetch'

@Injectable()
export class NotificationsService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    console.log('NotificationsService')
    // this.sendProjectNotification( '6402526282:AAHDM_OeRzUQ-xSvt1LaZc8h9hzK16aQrVE', '-971800524' )    
  }

  async sendTransactionNotification(
    telegramBotToken: string,
    telegramChannelId: string,
    chainName: string,
    wallet: string,
    amount: string,
    txHash: string,
    tokenSymbol: string,
    pairUrl: string,
    usdPrice: string,
    value: string,
    liquidity: string,
    fdv: string,
    createdAt: string,
    holders: number,
    buyTax: number,
    sellTax: number,
    codeVerified: boolean,
    renounced: boolean,
    isHoneypot: boolean,
    website: string
  )
  {
    const telegramMsg = `<b>[${chainName.toLocaleUpperCase()}]</b>%0A
    Wallet: ${wallet}%0A
    Token Symbol: ${tokenSymbol}%0A
    Amount: ${amount} ${tokenSymbol}%0A
    Value: ${value} USD%0A
    Price: ${usdPrice} USD%0A
    Liquidity: ${liquidity} USD%0A
    FDV: ${fdv} USD%0A
    TxHash: ${txHash}%0A
    Pair Address: ${pairUrl}%0A
    Pair Created Time: ${createdAt}%0A
    Holders: ${holders}%0A
    Buy Tax: ${buyTax}% %0A
    Sell Tax: ${sellTax}% %0A
    Code Verified: ${codeVerified} %0A
    Renounced: ${renounced} %0A
    Honeypot: ${isHoneypot} %0A
    Website: ${website} %0A
    `.replace(/    /g, '')

    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChannelId}&parse_mode=HTML&text=${telegramMsg}&disable_web_page_preview=true`
    fetch(url)
  }

  async sendProjectNotification(
    telegramBotToken: string,
    telegramChannelId: string,
    
  ) {
    const telegramMsg =
      `<b>token</b>
    `.replace(/    /g, '')

    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChannelId}&parse_mode=HTML&text=${telegramMsg}&disable_web_page_preview=true`
    fetch(url)
    console.log(url)
  }

  async sendNativeTokenNotification(
    chainName: string,
    fromAddress: string,
    toAddress: string,
    tokenSymbol: string,
    amount: number
  ) {
    const telegramMsg = `<b>[${chainName.toLocaleUpperCase()}] [NATIVE TRANSACTION]</b>%0A
    TokenSymbol: ${tokenSymbol}%0A
    FromAddress: ${fromAddress}%0A
    ToAddress: ${toAddress}%0A
    Amount: ${amount}`
    // this.sendTelegramMessage(telegramMsg.replace(/    /g, ''), 'TRANSACTION')
  }
}
