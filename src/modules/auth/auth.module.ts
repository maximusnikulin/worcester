import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { jwtConfig } from '@configs/jwt.config'

import { AuthController } from './auth.controller'
import { AuthRepository } from './repos/auth.repo'
import { AuthService } from './services/auth.service'
import { BcryptService } from './services/bcrypt.service'
import { JwtStrategy } from './services/jwt-strategy'

const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
  session: true,
})

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    passportModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, BcryptService],
  exports: [JwtStrategy, passportModule],
})
export class AuthModule {}
