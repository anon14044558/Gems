import { Document } from 'mongoose'

export interface SwapTopic extends Document {
  isEnabled: boolean
  topic: string
  name: string
  chain: string
}
