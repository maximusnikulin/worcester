import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import getEnv from '@configs/env.config'

import { Auth } from '../entities/auth.entity'
import { AuthRepository } from '../repos/auth.repo'
import { JwtPayload } from '../types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authRepository: AuthRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: getEnv().JWT_SECRET,
    })
  }

  async validate(payload: JwtPayload): Promise<Auth> {
    const { username } = payload
    const user = await this.authRepository.findOne(
      { username },
      { select: ['id', 'username'] },
    )

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
