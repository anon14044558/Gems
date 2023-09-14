import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class TokenInfoDto {
  @IsString()
  @IsNotEmpty()
  topic: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  chain?: string
}
