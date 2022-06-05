import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [__dirname + '/**/*.entity.ts'],
  logging: true,
  //   migrationsTableName: 'migration',
  //   migrations: [
  //     __dirname + '/migration/**/*.ts',
  //     __dirname + '/migration/**/*.js',
  //   ],
  synchronize: true,
}

export default typeOrmConfig
