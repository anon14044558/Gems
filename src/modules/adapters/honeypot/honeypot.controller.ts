import { Controller, Get, Query, Post, Body } from '@nestjs/common'
import { HoneypotService } from './honeypot.service'
import { TwitterV2Service } from '../twitter v2/twitterv2.service'
import { ImageDownloaderService } from '../image-downloader/image-downloader.service'

@Controller('contract')
export class HoneypotController {
  constructor(
    private readonly honeypotService: HoneypotService,
    private readonly twitterV2Service: TwitterV2Service,
    private readonly ImageDownloaderService: ImageDownloaderService
  ) {}

  @Get('check')
  async checkContract(@Query('tokenAddress') tokenAddress: string) {
    const chains = [
      { name: 'Ethereum', apiUrl: 'https://api.etherscan.io/api' },
      { name: 'BSC', apiUrl: 'https://api.bscscan.com/api' },
      { name: 'Polygon', apiUrl: 'https://api.polygonscan.com/api' },
      { name: 'Arbitrum', apiUrl: 'https://api.arbiscan.io/api' }
    ]

    const detectedChains = []

    await Promise.all(
      chains.map(async (chain) => {
        const isValid = await this.honeypotService.isContractValidOnChain(
          tokenAddress,
          chain.apiUrl
        )
        if (isValid) {
          detectedChains.push(chain.name)
        }
      })
    )

    if (detectedChains.length === 0) {
      throw new Error('Unsupported Chain')
    }

    const chain = detectedChains[0]

    const [honeyPotData, socialLinks, analyticsData, gasTracker] =
      await Promise.all([
        this.honeypotService.checkToken(chain, tokenAddress),
        this.honeypotService.getSocialLinksFromContract(tokenAddress, chain),
        this.honeypotService.getDexscreen(tokenAddress),
        this.honeypotService.fetchGasTracker()
      ])

    const responseData = {
      Info: {
        Chain: chain,
        Name: honeyPotData.Name,
        Symbol: honeyPotData.Symbol,
        TotalSupply: honeyPotData.TotalSupply,
        Holders: honeyPotData.Holders,
        TopHolders: honeyPotData.TopHolders,
        Liquidity: analyticsData.Liquidity
      },
      Security: {
        Buy: honeyPotData.Buy,
        Sell: honeyPotData.Sell,
        CodeVerified: honeyPotData.codeVerified,
        Renounced: honeyPotData.renounced,
        IsHoneypot: honeyPotData.isHoneypot,
        Locked: honeyPotData.Locked,
        Burned: honeyPotData.Burned,
        BadFunctions: honeyPotData.BadFunctions
      },
      Analytics: {
        Price: analyticsData.priceUsd,
        MarketCap: analyticsData.MarketCap,
        Age: analyticsData.pairAge,
        PriceChange: analyticsData.priceChange,
        Volume: analyticsData.volume,
        TXS: analyticsData.txs
      },
      Social: socialLinks,
      ETHGas: gasTracker
    }

    const icons = {
      CA: '📝',
      Name: '💎',
      TotalSupply: '🚛',
      Holders: '👥',
      Chain: '🔗',
      Tax: '💸',
      Mcap: '⚡️',
      Age: '🕰',
      Yes: '✅',
      No: '❌',
      Warning: '⚠️',
      Lock: '🔒',
      Price: '💰 ',
      Chart: '🔍'
    }

    const codeVerifiedIcon =
      responseData.Security.CodeVerified === 'Yes' ? icons.Yes : icons.No
    const codeRenouncedIcon =
      responseData.Security.Renounced === 'Yes' ? icons.Yes : icons.No
    const codeHoneypotIcon =
      responseData.Security.IsHoneypot === 'Yes' ? icons.Yes : icons.No
    const MethodIcon =
      responseData.Security.BadFunctions.length > 0 ? icons.Warning : icons.No

    const chainNameMapping1: { [key: string]: string } = {
      Ethereum: 'ethereum',
      BSC: 'bsc'
    }

    const chainNameMapping2: { [key: string]: string } = {
      Ethereum: 'eth',
      BSC: 'bsc'
    }

    const chainName1 = chainNameMapping1[chain] || chain

    const chartUrl = `https://dexscreener.com/${chainName1}/${analyticsData.Pair}`

    let formattedData1 = `
    ${icons.Name}Name: ${responseData.Info.Name} | ${responseData.Info.Symbol}
    ${icons.Chain} ${responseData.Info.Chain}
    ${icons.CA}CA: ${tokenAddress}
    ${icons.Price}Price: ${responseData.Analytics.Price} USD
    ${icons.Chart}${chartUrl}
    #${responseData.Info.Symbol.toLowerCase()} #${chainName1}
    `.replace(/    /g, '')

    let formattedData2 = `
    Token Security

    Buy tax: ${responseData.Security.Buy}%  📈| Sell tax: ${responseData.Security.Sell}% 📉 
    Burned: ${responseData.Security.Burned}
    Honeypot: ${codeHoneypotIcon}
    Verified: ${codeVerifiedIcon}
    Renounced: ${codeRenouncedIcon}
    Method: ${MethodIcon}
    `.replace(/    /g, '')

    let formattedData3 = `
    Pair Analytic 📊

    🔥${analyticsData.PairInfo}: ${analyticsData.Pair}
    💦 Liquidity: ${responseData.Info.Liquidity} (${responseData.Security.Locked})
    🚀 FDV: ${responseData.Analytics.MarketCap}
    📅 Created: ${responseData.Analytics.Age}
    🤝 Holders: ${responseData.Info.Holders}
    ${icons.TotalSupply}Sup: ${responseData.Info.TotalSupply}
    `.replace(/    /g, '')

    const chainName2 = chainNameMapping2[chain] || chain

    const imageUrl = `https://www.dexview.com/${chainName2}/${tokenAddress}`
    const imageName = honeyPotData.Symbol
    await this.ImageDownloaderService.downloadImageFromDiv(imageUrl, imageName)

    const mediaId = await this.twitterV2Service.uploadMedia(
      `./downloads/${honeyPotData.Symbol}.png`
    )

    console.log(formattedData1)
    console.log(formattedData2)
    console.log(formattedData3)

    await this.twitterV2Service.postThreadTweet([
      { text: formattedData1, media: { media_ids: [mediaId] } },
      formattedData2,
      formattedData3
    ])

    return responseData
  }
}
