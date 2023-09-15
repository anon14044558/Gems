import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fetch from 'node-fetch'

@Injectable()
export class GopluslabsService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    console.log('GopluslabsService')
  }

  async checkToken(chain: string, tokenAddress: string) {
    const chainId = this.convertChainId(chain)
    const url = `https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${tokenAddress}`
    console.log(url)
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          accept: '*/*'
        }
      })
      if (!res.ok) {
        throw new Error('Failed to fetch token data from the API')
      }

      const responseData = await res.json()
      const tokenData = responseData.result[tokenAddress.toLowerCase()]

      const holders = tokenData.holders

      const sortedHolders = holders.sort(
        (a, b) => parseFloat(b.percent) - parseFloat(a.percent)
      )
      const top3Holders = sortedHolders.slice(0, 3)
      const formattedPercentages = top3Holders.map(
        (holder) => (parseFloat(holder.percent) * 100).toFixed(1) + '%'
      )
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

      const badFunctionFields = [
        'can_take_back_ownership',
        'cannot_buy',
        'cannot_sell_all',
        'is_anti_whale',
        'is_blacklisted',
        'is_mintable',
        'is_proxy',
        'is_whitelisted',
        'trading_cooldown',
        'transfer_pausable'
      ]

      const badFunctions = []

      for (const field of badFunctionFields) {
        if (tokenData[field] === '1') {
          badFunctions.push(field)
        }
      }

      const buyTax = parseFloat(tokenData.buy_tax) * 100
      const sellTax = parseFloat(tokenData.sell_tax) * 100

      const Buy = buyTax.toFixed(1)
      const Sell = sellTax.toFixed(1)

      const honeyPotData = {
        Name: tokenData.token_name,
        Symbol: tokenData.token_symbol,
        TotalSupply: tokenData.total_supply,
        Holders: parseInt(tokenData.holder_count),
        TopHolders: formattedPercentages.join(' | '),
        Buy: Buy,
        Sell: Sell,
        codeVerified: tokenData.is_open_source === '1' ? 'Yes' : 'No',
        renounced:
          tokenData.owner_address ===
          '0x0000000000000000000000000000000000000000'
            ? 'Yes'
            : 'No',
        isHoneypot: tokenData.is_honeypot === '1' ? 'Yes' : 'No',
        Locked: [],
        Burned: [],
        BadFunctions: badFunctions
      }

      if (tokenData.lp_holders && Array.isArray(tokenData.lp_holders)) {
        for (const holder of tokenData.lp_holders) {
          if (holder.is_locked !== 1) {
            continue
          }
          if (holder.tag === 'Null Address') {
            const percent = parseFloat(holder.percent) * 100
            const formattedPercent = percent.toFixed(2)
            honeyPotData.Burned.push(`Lp Burned: ${formattedPercent}%`)
          } else if (holder.tag) {
            const percent = parseFloat(holder.percent) * 100
            if (holder.locked_detail && holder.locked_detail.length > 0) {
              const endTime = new Date(holder.locked_detail[0].end_time)
              const optTime = new Date(holder.locked_detail[0].opt_time)
              const lockTimeInMonths = this.calculateLockTimeInMonths(
                endTime,
                optTime
              )
              honeyPotData.Locked.push(
                `${holder.tag} ${percent.toFixed(
                  0
                )}% (${lockTimeInMonths} months)`
              )
            } else {
              honeyPotData.Locked.push(`${holder.tag} ${percent.toFixed(0)}%`)
            }
          }
        }
      } else {
        honeyPotData.Locked.push(`No Locked`)
        honeyPotData.Burned.push(`No Burned`)
      }

      return honeyPotData
    } catch (error) {
      console.error('Error fetching HoneyPot data:', error.message)
      throw error
    }
  }

  calculateLockTimeInMonths(endTime: Date, optTime: Date): number {
    const lockTimeInMilliseconds = endTime.getTime() - optTime.getTime()
    const lockTimeInMonths = lockTimeInMilliseconds / (1000 * 60 * 60 * 24 * 30)
    return Math.floor(lockTimeInMonths)
  }

  // Convert Chain sang Id
  convertChainId(chain: string): string {
    switch (chain) {
      case 'Ethereum':
        return '1'
      case 'BSC':
        return '56'
      case 'Polygon':
        return '137'
      case 'Arbitrum':
        return '42161'
      default:
        return ''
    }
  }
}
