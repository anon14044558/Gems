import { Document } from 'mongoose'

export interface Project extends Document {
  isEnabled: boolean
  chainId: number
  tokenName: string
  tokenSymbol: string
  tokenAddress: string
  dexPairUrl: string
  createdAt: string
  updatedAt: string
}
