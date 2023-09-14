import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Project } from './projects.interface'
import { CreateProjectDto } from './dto/request.dto'

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('Project') private projectModel: Model<Project>) {}

  async getProjectByAddress(tokenAddress: string) {
    return this.projectModel.findOne({ tokenAddress })
  }

  async createProject(createProjecttDto: CreateProjectDto) {
    try {
      const newProject = await this.projectModel.create(createProjecttDto)
      return newProject
    } catch (error) {
      return false
    }
  }
}
