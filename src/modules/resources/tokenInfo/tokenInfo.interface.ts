  import { Document } from 'mongoose';

  export interface TokenInfo extends Document {
    address: string;
    exchange: string;
    dextScore: number;
    price: number;
    refAddress: string;
    refName: string;
    refSymbol: string;
  }
