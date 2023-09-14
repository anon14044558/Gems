import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  chainName: string

  @IsString()
  @IsNotEmpty()
  walletAddress: string

  @IsString()
  @IsNotEmpty()
  tokenSymbol: string

  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsString()
  @IsNotEmpty()
  txType: string

  @IsString()
  @IsNotEmpty()
  txHash: string
}
