import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateWalletDto {
  @IsString()
  @IsNotEmpty()
  address: string

  @IsString()
  @IsOptional()
  parentWallet?: string

  @IsArray()
  @IsOptional()
  walletTree?: string[]
}
