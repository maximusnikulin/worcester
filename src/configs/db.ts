import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const db = async (service: ConfigService): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'mysql',
    host: service.get('DB_HOST'),
    port: service.get('DB_PORT'),
    username: service.get('DB_USER'),
    password: service.get('DB_PASSWORD'),
    database: service.get('DB_NAME'),
    entities: [__dirname + '/**/*.entity.ts'],
    logging: true,
    //   migrationsTableName: 'migration',
    //   migrations: [
    //     __dirname + '/migration/**/*.ts',
    //     __dirname + '/migration/**/*.js',
    //   ],
    synchronize: true,
  }
}

export default db
