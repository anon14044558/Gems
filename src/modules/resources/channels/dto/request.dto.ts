import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'

export class CreateChannelDto {
  @IsBoolean()
  @IsNotEmpty()
  isEnabled: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  telegramId: string

  @IsString()
  @IsNotEmpty()
  telegramToken: string

  @IsNumber()
  @IsOptional()
  maxPairCreatedDays?: number

  @IsNumber()
  @IsOptional()
  minPairCreatedDays?: number

  @IsNumber()
  @IsOptional()
  maxLiquidity?: number

  @IsNumber()
  @IsOptional()
  minLiquidity?: number

  @IsNumber()
  @IsOptional()
  maxFDV?: number

  @IsNumber()
  @IsOptional()
  minFDV?: number

  @IsNumber()
  @IsOptional()
  maxValue?: number

  @IsNumber()
  @IsOptional()
  minValue?: number

  @IsBoolean()
  @IsOptional()
  isSendTransactionNotification?: boolean
}
