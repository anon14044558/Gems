import { Document } from 'mongoose'

export interface Chain extends Document {
  isEnabled: boolean
  chainName: string
  chainId: number
  explorer: string
  nativeToken: string
  rpcProvider: string
  currentScanBlock: number
  maxScanBlocks: number
  safeScanBlocks: number
  isScanEnabled: boolean
  excludeScanContracts: string[]
  createdAt: string
  updatedAt: string
}
