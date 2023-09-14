import { Document } from 'mongoose'

export interface Transaction extends Document {
  chainName: string
  walletAddress: string
  tokenSymbol: string
  amount: number
  txType: string
  txHash: string
  createdAt: Date
  updatedAt: Date
}
