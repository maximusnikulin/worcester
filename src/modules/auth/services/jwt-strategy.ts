import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy, ExtractJwt } from 'passport-jwt'

import { AuthRepository } from '../repos/auth.repo'
import { Auth } from '../entities/auth.entity'
import { JwtPayload } from '../types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthRepository)
    private userRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: JwtPayload): Promise<Auth> {
    const { username } = payload
    const user = await this.userRepository.findOne({ where: { username } })

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
