import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { EntityRepository, Repository } from 'typeorm'

import { JwtPayload } from '@modules/auth/types'

import { SigninDto } from '../dto/signin.dto'
import { SignupDto } from '../dto/signup.dto'
import { Auth } from '../entities/auth.entity'

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  async signUp(signupCredentialsDto: SignupDto): Promise<Auth> {
    const { username, password } = signupCredentialsDto

    const matchCount = await this.count({ username })
    if (matchCount > 0) {
      throw new ConflictException('Username already exists')
    }

    try {
      const user = new Auth()

      user.username = username
      user.salt = await bcrypt.genSalt()
      user.password = await this.hashPassword(password, user.salt)

      const res = await user.save()
      delete res.password
      delete res.salt

      return res
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  async validateUserPassword(
    signinCredentialDto: SigninDto,
  ): Promise<JwtPayload> {
    const MESSAGE_FAIL = 'user or password is wrong'
    const { username, password } = signinCredentialDto

    const auth = await this.findOneOrFail({
      username,
    }).catch(() => {
      throw new UnauthorizedException(MESSAGE_FAIL)
    })

    if (await auth.validatePassword(password)) {
      return {
        username: auth.username,
      }
    }

    throw new UnauthorizedException(MESSAGE_FAIL)
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
