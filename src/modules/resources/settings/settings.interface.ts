import { Document } from 'mongoose'

export interface Setting extends Document {
  isSystemEnabled: boolean
  isStreamEnabled: boolean
  minWhaleBalance: number
  maxWhaleBalance: number
  maxLiquidity: number
  minLiquidity: number
  maxFDV: number
  minFDV: number
  maxValue: number
  minValue: number
  maxPairCreatedDays: number
}
