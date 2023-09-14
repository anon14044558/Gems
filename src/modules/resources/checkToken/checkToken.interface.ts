import { Document } from 'mongoose';

export interface CheckTokenInfo extends Document {
  holders: number;
  buyTax: number;
  sellTax: number;
  codeVerified: boolean;
  renounced: boolean;
  isHoneypot: boolean;
  Locked: string[];
}
