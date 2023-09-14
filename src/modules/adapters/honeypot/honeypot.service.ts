import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fetch from 'node-fetch'
import { ethers } from 'ethers'

@Injectable()
export class HoneypotService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    console.log('honeypotService')
  }

  //Check token Chain

  async isContractValidOnChain(
    tokenAddress: string,
    apiUrl: string
  ): Promise<boolean> {
    const isValid = ethers.utils.isAddress(tokenAddress)

    if (!isValid) {
      throw new Error('Invalid address')
    }

    try {
      const response = await fetch(
        `${apiUrl}?module=proxy&action=eth_getCode&address=${tokenAddress}`
      )
      const responseData = await response.json()
      return responseData.result !== '0x'
    } catch (error) {
      console.error('Error checking contract:', error)
      throw new Error('Error checking contract')
    }
  }

  //Check thông tin cơ bản về token
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
      console.log(responseData)
      const tokenData = responseData.result[tokenAddress.toLowerCase()]

      console.log(tokenData)
      console.log(tokenData.token_name)

      const holders = tokenData.holders

      const sortedHolders = holders.sort(
        (a, b) => parseFloat(b.percent) - parseFloat(a.percent)
      )
      const top3Holders = sortedHolders.slice(0, 3)
      const formattedPercentages = top3Holders.map(
        (holder) => (parseFloat(holder.percent) * 100).toFixed(1) + '%'
      )

      //Format lại liquidity
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

      //Tìm Bad Function
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
        // Liquidity: formatLiquidity(tokenData.dex[0].liquidity),
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
        Burned:[],
        BadFunctions: badFunctions
      }

      console.log(honeyPotData)

      //Tìm thông tin Locked LP
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
              honeyPotData.Locked.push(
                `${holder.tag} ${percent.toFixed(0)}%`
              )
            }
          }
        }
      } else {
        honeyPotData.Locked.push(
          `No Locked`
        )
        honeyPotData.Burned.push(
          `No Burned`
        )
      }

      console.log(honeyPotData)

      return honeyPotData
    } catch (error) {
      console.error('Error fetching HoneyPot data:', error.message)
      throw error
    }
  }

  //Tìm Social Links
  async getSocialLinksFromContract(tokenAddress: string, chain: string) {
    let apiUrl: string

    if (chain === 'Ethereum') {
      apiUrl = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${tokenAddress}&apikey=2WVGY1J1PCHTGRGGDMDD3RTYI6KXXBC95Q`
    } else if (chain === 'BSC') {
      apiUrl = `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${tokenAddress}&apikey=3II1QZCEQN7T669Q274V42Q2REH2IXYRFA`
    } else if (chain === 'Polygon') {
      apiUrl = `https://api.polygonscan.com/api?module=contract&action=getsourcecode&address=${tokenAddress}&apikey=SJNPUVTMNH99Z7A3F1DD1FHU2C378YN7M6`
    } else if (chain === 'Arbitrum') {
      apiUrl = `https://api.arbiscan.io/api?module=contract&action=getsourcecode&address=${tokenAddress}&apikey=K3K1JQ2MHN7M2T9SY4HFFDY34SYPRYQ8J7`
    } else {
      throw new Error('Unsupported chain')
    }

    try {
      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error('Failed to fetch contract source code')
      }

      const responseData = await response.json()
      const contractSourceCode = responseData.result[0].SourceCode

      const socialLinksRegex =
        /(https:\/\/(?:t\.me|twitter\.com|[^.]+\.com)\/[^\s]+)/g
      const socialLinks = []

      let telegramLinkFound = false
      let match

      while ((match = socialLinksRegex.exec(contractSourceCode)) !== null) {
        const link = match[0]

        const cleanedLink = link.replace(/\\r\\n/g, ' ').trim()

        let finalLink

        if (cleanedLink.includes('https://t.me/') && !telegramLinkFound) {
          finalLink = 'Telegram: ' + cleanedLink
          telegramLinkFound = true
        } else if (cleanedLink.includes('https://twitter.com/')) {
          finalLink = 'Twitter: ' + cleanedLink
        } else if (cleanedLink.includes('.com')) {
          if (
            !socialLinks.find((item) => item.includes('Website')) &&
            !cleanedLink.includes('github.com')
          ) {
            finalLink = 'Website: ' + cleanedLink
          }
        }

        if (finalLink) {
          socialLinks.push(finalLink)
        }
      }

      console.log(socialLinks)

      return socialLinks
    } catch (error) {
      throw new Error(`Error retrieving social links: ${error.message}`)
    }
  }

  //Tính Lock Time của LP
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

  async getDexscreen(tokenAddress) {
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
            pairAge += ` ${hoursDifference} Hr${
              hoursDifference > 1 ? 's' : ''
            }`
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
        console.log(pairData.baseToken.symbol)

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

        console.log('Token Data:', tokenData)
        return tokenData
      } else {
        console.log('No pair data found.')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async fetchGasTracker() {
    const apiUrl = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=2WVGY1J1PCHTGRGGDMDD3RTYI6KXXBC95Q`

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch gas tracker data')
      }

      const responseData = await response.json()
      const gasData = responseData.result

      const gasTracker = {
        low: gasData.SafeGasPrice,
        average: gasData.ProposeGasPrice,
        high: gasData.FastGasPrice
      }

      return gasTracker
    } catch (error) {
      console.error('Error fetching gas tracker data:', error.message)
      throw error
    }
  }
}
