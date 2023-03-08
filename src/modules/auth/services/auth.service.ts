import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { SigninDto } from '../dto/signin.dto'
import { SignupDto } from '../dto/signup.dto'
import { Auth } from '../entities/auth.entity'
import { AuthRepository } from '../repos/auth.repo'
import { JwtPayload, LogoutResponse, SignUpResponse } from '../types'

import { BcryptService } from './bcrypt.service'

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private cryptoService: BcryptService,
  ) {}

  async signUp(signupCredentialsDto: SignupDto): Promise<SignUpResponse> {
    const { username, password } = signupCredentialsDto

    const matchCount = await this.authRepository.count({ username })
    if (matchCount > 0) {
      throw new ConflictException('Username already exists')
    }

    try {
      const user = new Auth()

      user.username = username
      user.salt = await this.cryptoService.genSalt()
      user.password = await this.cryptoService.hashPassword(password, user.salt)

      const res = await user.save()

      delete res.password
      delete res.salt

      return { username: res.username, id: res.id }
    } catch (err) {
      throw new InternalServerErrorException(err)
    }
  }

  async validateUserPassword(
    signinCredentialDto: SigninDto,
  ): Promise<JwtPayload> {
    const MESSAGE_FAIL = 'user or password is wrong'
    const { username, password } = signinCredentialDto

    const auth = await this.authRepository
      .findOneOrFail({
        username,
      })
      .catch(err => {
        throw new UnauthorizedException(MESSAGE_FAIL)
      })

    if (await auth.validatePassword(password)) {
      return {
        id: auth.id,
        username: auth.username,
      }
    }

    throw new UnauthorizedException(MESSAGE_FAIL)
  }

  // private async validateUserToken(params: {
  //   userId: number
  //   token: string
  // }): Promise<boolean> {
  //   const user = await this.authRepository.findOne(params.userId)
  //   if (!user.token) {
  //     return false
  //   }

  //   return user.validateToken(params.token)
  // }

  async signIn(
    signInCredentialsDto: SigninDto,
  ): Promise<{ accessToken: string; payload: JwtPayload }> {
    const resp = await this.validateUserPassword(signInCredentialsDto)

    if (!resp) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: JwtPayload = resp
    const accessToken = this.jwtService.sign(payload)

    await this.authRepository.updateToken({
      userId: resp.id,
      token: accessToken,
    })

    return {
      accessToken,
      payload: resp,
    }
  }

  async logout(userId: number): Promise<LogoutResponse> {
    await this.authRepository.update({ id: userId }, { token: null })
    return {
      userId,
      status: true,
    }
  }
}
