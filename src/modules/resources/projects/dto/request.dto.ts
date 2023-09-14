import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  chainId: number

  @IsString()
  @IsNotEmpty()
  tokenAddress: string

  @IsString()
  @IsOptional()
  tokenName?: string

  @IsString()
  @IsOptional()
  tokenSymbol?: string

  @IsString()
  @IsOptional()
  dexPairUrl?: string
}
