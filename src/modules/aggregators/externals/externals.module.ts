import { Module } from '@nestjs/common'
import { ExternalsService } from './externals.service'
import { ExternalsController } from './externals.controller'

@Module({
  imports: [],
  providers: [ExternalsService],
  controllers: [ExternalsController]
})
export class ExternalsModule {}
