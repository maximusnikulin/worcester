import { ModuleMetadata } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import dbConfig from '@configs/db.config'

export function getTestingWithApp({
  imports = [],
  controllers = [],
  providers = [],
}: ModuleMetadata): ModuleMetadata {
  return {
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync(dbConfig),
      ...imports,
    ],
    controllers: [...controllers],
    providers: [...providers],
  }
}

export function getPreffix(): string {
  return Date.now().toString()
}
