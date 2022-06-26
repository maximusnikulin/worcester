import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { SignupDto, SigninDto } from '@dtos/index'

import { JwtPayload } from '@modules/auth/types'

import { Auth } from '../entities/auth.entity'

export class AuthRepository extends Repository<Auth> {
  async signUp(signupCredentialsDto: SignupDto) {
    const { username, password } = signupCredentialsDto

    const user = new Auth()
    user.username = username
    user.salt = await bcrypt.genSalt()
    user.password = await this.hashPassword(password, user.salt)

    try {
      await user.save()
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException(err)
      }
    }
  }

  async validateUserPassword(
    signinCredentialDto: SigninDto,
  ): Promise<JwtPayload> {
    const { username, password } = signinCredentialDto
    const auth = await this.findOneByOrFail({
      username,
    })

    if (await auth.validatePassword(password)) {
      return {
        username: auth.username,
      }
    }

    throw new UnauthorizedException('password wrong')
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
