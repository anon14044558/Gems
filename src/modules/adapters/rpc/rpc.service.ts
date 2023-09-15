import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fetch from 'node-fetch'
import { ethers } from 'ethers'

@Injectable()
export class RpcService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    console.log('rpcService')
  }

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

      return socialLinks
    } catch (error) {
      throw new Error(`Error retrieving social links: ${error.message}`)
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
