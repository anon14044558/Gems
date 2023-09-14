import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TokenInfoDto {

  @IsString()
  @IsNotEmpty()
  chainName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  exchange: string;

  @IsNumber()
  @IsNotEmpty()
  dextScore: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  refAddress: string;

  @IsString()
  @IsNotEmpty()
  refName: string;

  @IsString()
  @IsNotEmpty()
  refSymbol: string;
}

export class updateTokenDto {
  @IsNumber()
  @IsNotEmpty()
  dextScore: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
