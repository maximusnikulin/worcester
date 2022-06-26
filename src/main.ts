import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import runDocs from './docs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')
  // if (process.env.NODE_ENV === 'production') {
  runDocs(app)
  // }

  await app.listen(process.env.APP_PORT)
}
bootstrap()
