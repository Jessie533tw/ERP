import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'
import compression from 'compression'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.use(helmet())
  app.use(compression())

  app.enableCors(configService.get('cors'))

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('建設公司 ERP API')
    .setDescription('建設公司發包管理系統 API 文件')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  app.use('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
  })

  const port = configService.get<number>('port', 3000)
  await app.listen(port)

  console.log(`🚀 應用程式已啟動於 http://localhost:${port}`)
  console.log(`📚 API 文件位址：http://localhost:${port}/api-docs`)
}

bootstrap()