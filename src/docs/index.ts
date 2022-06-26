import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export default function runDocs(app: INestApplication) {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Smart Date backend')
    .setDescription('Smart Date backend documentation')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api/v1', app, document)
}
