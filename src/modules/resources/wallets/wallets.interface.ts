import { Document } from 'mongoose'

export interface Wallet extends Document {
  isEnabled: boolean
  name: string
  address: string
  parentWallet: string
  walletTree: string[]
  email: string
  twitter: string
  facebook: string
  telegram: string
  createdAt: string
  updatedAt: string
}
