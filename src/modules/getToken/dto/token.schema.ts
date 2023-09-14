import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop()
  address: string;

  @Prop()
  exchange: string;

  @Prop()
  dextScore: number;

  @Prop()
  price: number;

  @Prop()
  refAddress: string;

  @Prop()
  refName: string;

  @Prop()
  refSymbol: string;
}


@Schema()
export class Honey {

  @Prop()
  holders: number;

  @Prop()
  buyTax: number;

  @Prop()
  sellTax: number;

  @Prop()
  codeVerified: boolean;

  @Prop()
  renounced: boolean;

  @Prop()
  isHoneypot: boolean;
}
export const TokenSchema = SchemaFactory.createForClass(Token);

export class getTokenDto {
  symbol: string;
  name: string;
  address: string;
  exchange: string;
  dextScore: number;
  price: number;
  refAddress: string;
  refName: string;
  refSymbol: string;
}

export class HoneyDto {
  holders: number;
  buyTax: number;
  sellTax: number;
  codeVerified: boolean;
  renounced: boolean;
  isHoneypot: boolean;

}
