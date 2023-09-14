import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './dto/token.schema';
import { GetTokenController } from './getToken.controller'; 
import { GetTokenService } from './getToken.service'; 
import { TokenInfoModule } from '../resources/tokenInfo/tokenInfo.module';
import { CheckTokenModule } from '../resources/checkToken/checkToken.module';
import { checkTokenSchema } from '../resources/checkToken/checkToken.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
    ]),
    MongooseModule.forFeature([
      { name: Token.name, schema: checkTokenSchema },
    ]),
    TokenInfoModule,
    CheckTokenModule
  ],
  controllers: [GetTokenController], 
  providers: [GetTokenService],
})
export class GetTokenModule {}
