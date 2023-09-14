import helmet from 'helmet'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe())

  // Kafka

  // Logger

  // Monitor

  // Swagger
  
  const port = 8080;

  await app.listen('8080')

  const logger = new Logger('Main')
  logger.log(`REST port: 8080`)
}
bootstrap()
