import { ModuleMetadata } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import dbConfig from '@configs/db.config'

import { AppController } from '@modules/app/app.controller'
import { AppService } from '@modules/app/app.service'
import { AuthModule } from '@modules/auth/auth.module'

export function getTestingWithApp(meta?: ModuleMetadata): ModuleMetadata {
  const { imports = [], controllers = [], providers = [] } = meta || {}

  return {
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync(dbConfig),
      AuthModule,
      ...imports,
    ],
    controllers: [AppController, ...controllers],
    providers: [AppService, ...providers],
  }
}

export function getPreffix(): string {
  return Date.now().toString()
}
