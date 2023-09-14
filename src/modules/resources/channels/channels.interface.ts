import { Document } from 'mongoose'

export interface Channel extends Document {
  isEnabled: boolean
  name: string
  telegramId: string
  telegramToken: string
  minPairCreatedDays: number
  maxPairCreatedDays: number
  maxLiquidity: number
  minLiquidity: number
  maxFDV: number
  minFDV: number
  maxValue: number
  minValue: number
  isSendTransactionNotification: boolean
}
