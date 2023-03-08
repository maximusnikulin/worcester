import * as path from 'path'

import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'

import getEnv from './env.config'

export const entitiesPath = path.join(__dirname, '..', '**', '*.entity.{js,ts}')

const dbConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => {
    const { IS_TEST, DB_PORT, DB_NAME, DB_PASSWORD, DB_USER, DB_HOST } =
      getEnv()

    if (IS_TEST) {
      return {
        type: 'sqlite',
        database: `${DB_NAME}.test.sqlite`,
        dropSchema: false,
        entities: [entitiesPath],
        synchronize: true,
        logging: false,
      }
    }

    return {
      type: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [entitiesPath],
      logging: false,
      synchronize: true,
    }
  },
}

export default dbConfig
