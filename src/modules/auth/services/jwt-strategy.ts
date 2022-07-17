import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { RequestWithUser } from 'src/types/requests'

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
      passReqToCallback: true,
    })
  }

  async validate(req: RequestWithUser, payload: JwtPayload): Promise<Auth> {
    // TODO: in constants or helper better
    const token = (req.headers['authorization'] ?? '').match(
      /^Bearer\s(.*)/,
    )?.[1]
    const { username } = payload

    const user = await this.authRepository.findOne({ username })

    const isValidToken = await user.validateToken(token)

    if (!isValidToken || !user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
