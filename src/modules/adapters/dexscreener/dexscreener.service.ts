import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fetch from 'node-fetch'

@Injectable()
export class DexscreenerService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    console.log('DexscreenerService')
  }
  async getDexscreen(tokenAddress: string) {
    try {
      const url = `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
        }
      })

      const resData = await res.json()
      const pairs = resData.pairs

      if (pairs.length > 0) {
        const pairData = pairs[0]
        const currentTime = Date.now()
        const pairCreatedAt = pairData.pairCreatedAt
        const timeDifference = currentTime - pairCreatedAt

        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24)
        )
        const hoursDifference = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )

        let pairAge = ''
        if (daysDifference > 0) {
          pairAge += `${daysDifference} Day${daysDifference > 1 ? 's' : ''}`
          if (hoursDifference > 0) {
            pairAge += ` ${hoursDifference} Hr${hoursDifference > 1 ? 's' : ''}`
          }
        } else {
          pairAge = `${hoursDifference} Hr${hoursDifference > 1 ? 's' : ''}`
        }

        function formatLiquidity(value) {
          const num = parseFloat(value)
          if (num >= 1000000) {
            const formattedValue = (num / 1000000).toFixed(1) + 'm'
            return formattedValue
          } else if (num >= 1000) {
            const formattedValue = (num / 1000).toFixed(1) + 'k'
            return formattedValue
          } else {
            return num.toString()
          }
        }

        function formatFDV(fdv) {
          if (fdv >= 1000000) {
            return (fdv / 1000000).toFixed(1) + 'M'
          } else if (fdv >= 1000) {
            return (fdv / 1000).toFixed(0) + 'K'
          } else {
            return fdv.toString()
          }
        }

        function formatPercentageChange(value) {
          return value.toFixed(2) + '%'
        }

        function formatVolume(value) {
          if (value >= 1000000) {
            return '$' + (value / 1000000).toFixed(1) + 'M'
          } else if (value >= 1000) {
            return '$' + (value / 1000).toFixed(1) + 'K'
          } else {
            return '$' + value.toFixed(2)
          }
        }

        function formatTxs(txns) {
          return `${txns.buys}/${txns.sells}`
        }

        const priceChange = {
          m5: formatPercentageChange(pairData.priceChange.m5),
          h1: formatPercentageChange(pairData.priceChange.h1),
          h6: formatPercentageChange(pairData.priceChange.h6),
          h24: formatPercentageChange(pairData.priceChange.h24)
        }

        const volume = {
          m5: formatVolume(pairData.volume.m5),
          h1: formatVolume(pairData.volume.h1),
          h6: formatVolume(pairData.volume.h6),
          h24: formatVolume(pairData.volume.h24)
        }

        const txs = {
          m5: formatTxs(pairData.txns.m5),
          h1: formatTxs(pairData.txns.h1),
          h6: formatTxs(pairData.txns.h6),
          h24: formatTxs(pairData.txns.h24)
        }

        const PairInfo = `${pairData.baseToken.symbol}/${pairData.quoteToken.symbol}`

        let liquidity = pairData.liquidity.usd

        const tokenData = {
          Pair: pairData.pairAddress,
          priceUsd: pairData.priceUsd,
          Liquidity: formatLiquidity(liquidity),
          MarketCap: formatFDV(pairData.fdv),
          PairInfo: PairInfo,
          pairAge: pairAge,
          priceChange: `Price Change: 5M: ${priceChange.m5} | 1H: ${priceChange.h1} | 6H: ${priceChange.h6} | 1D: ${priceChange.h24}`,
          volume: `Volume: 5M: ${volume.m5} | 1H: ${volume.h1} | 6H: ${volume.h6} | 1D: ${volume.h24}`,
          txs: `Txs (B/S): 5M: ${txs.m5} | 1H: ${txs.h1} | 6H: ${txs.h6} | 1D: ${txs.h24}`
        }

        return tokenData
      } else {
        console.log('No pair data found.')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}
