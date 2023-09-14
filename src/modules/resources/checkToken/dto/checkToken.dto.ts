import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsArray } from 'class-validator';

export class checkTokenDto {

  @IsString()
  @IsNotEmpty()
  chainId: string;

  @IsString()
  @IsNotEmpty()
  tokenAddress: string;

  @IsNumber()
  @IsNotEmpty()
  holders: number;

  @IsNumber() 
  @IsNotEmpty()
  buyTax: number;

  @IsNumber()
  @IsNotEmpty()
  sellTax: number;

  @IsBoolean()
  @IsNotEmpty()
  codeVerified: boolean;

  @IsBoolean()
  @IsNotEmpty()
  renounced: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isHoneypot: boolean;

  @IsArray()
  @IsNotEmpty()
  Locked: string[];
}
