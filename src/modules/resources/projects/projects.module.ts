import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProjectSchema } from './projects.schema'
import { ProjectsService } from './projects.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }])
  ],
  providers: [ProjectsService],
  exports: [ProjectsService],
  controllers: []
})
export class ProjectsModule {}
