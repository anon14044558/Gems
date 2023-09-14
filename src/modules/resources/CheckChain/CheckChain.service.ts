import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CheckChainService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    console.log('CheckChainService');
  }

  async isContractValidOnChain(address: string, apiUrl: string): Promise<boolean> {
    const isValid = ethers.utils.isAddress(address);

    if (!isValid) {
      throw new Error('Invalid address');
    }

    try {
      const response = await fetch(`${apiUrl}?module=proxy&action=eth_getCode&address=${address}`);
      const responseData = await response.json();
      return responseData.result !== '0x';
    } catch (error) {
      console.error('Error checking contract:', error);
      throw new Error('Error checking contract');
    }
  }

  async getSocialLinksFromContract(contractAddress: string, chain: string) {
    let apiUrl: string;

    if (chain === 'Ethereum') {
      apiUrl = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=2WVGY1J1PCHTGRGGDMDD3RTYI6KXXBC95Q`;
    } else if (chain === 'BSC') {
      apiUrl = `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=3II1QZCEQN7T669Q274V42Q2REH2IXYRFA`;
    }  else if (chain === 'Polygon') {
        apiUrl = `https://api.polygonscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=SJNPUVTMNH99Z7A3F1DD1FHU2C378YN7M6`;
    }  else if (chain === 'Arbitrum') {
        apiUrl = `https://api.arbiscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=K3K1JQ2MHN7M2T9SY4HFFDY34SYPRYQ8J7`;
    } else {
      throw new Error('Unsupported chain');
    }

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch contract source code');
      }

      const responseData = await response.json();
      const contractSourceCode = responseData.result[0].SourceCode;

      const socialLinksRegex = /(https:\/\/t\.me\/[^\s]+|https:\/\/twitter\.com\/[^\s]+|https?:\/\/[^\s]+\.com)/g;
      const socialLinks = [];
      let match;

      while ((match = socialLinksRegex.exec(contractSourceCode)) !== null) {
        const link = match[0];

        if (link.includes('https://t.me/')) {
          socialLinks.push('Telegram ' + link);
        } else if (link.includes('https://twitter.com/')) {
          socialLinks.push('Twitter ' + link);
        } else if (link.includes('.com')) {
          if (!socialLinks.find(item => item.includes('Website'))) {
            socialLinks.push('Website ' + link);
          }
        }
      }

      console.log(socialLinks);

      return socialLinks;
    } catch (error) {
      throw new Error(`Error retrieving social links: ${error.message}`);
    }
  }
}
