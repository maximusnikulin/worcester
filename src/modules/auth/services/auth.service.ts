import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'

import { SignupDto, SigninDto } from '@dtos/index'

import { AuthRepository } from '../repos/auth.repo'
import { JwtPayload } from '../types'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signupCredentialsDto: SignupDto): Promise<void> {
    return this.authRepository.signUp(signupCredentialsDto)
  }

  async signIn(
    signInCredentialsDto: SigninDto,
  ): Promise<{ accessToken: string; user: JwtPayload }> {
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
      user: resp,
    }
  }
}
