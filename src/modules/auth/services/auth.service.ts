import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { SigninDto } from '../dto/signin.dto'
import { SignupDto } from '../dto/signup.dto'
import { Auth } from '../entities/auth.entity'
import { AuthRepository } from '../repos/auth.repo'
import { JwtPayload } from '../types'

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signupCredentialsDto: SignupDto): Promise<Auth> {
    return this.authRepository.signUp(signupCredentialsDto)
  }

  async signIn(
    signInCredentialsDto: SigninDto,
  ): Promise<{ accessToken: string; payload: JwtPayload }> {
    const resp = await this.authRepository.validateUserPassword(
      signInCredentialsDto,
    )
    if (!resp) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: JwtPayload = resp
    const accessToken = this.jwtService.sign(payload)

    return {
      accessToken,
      payload: resp,
    }
  }
}
