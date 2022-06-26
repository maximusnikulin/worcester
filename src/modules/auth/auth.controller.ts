import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common'

import { SignupDto, SigninDto } from '@dtos/index'

import { AuthService } from './services/auth.service'
import { JwtPayload } from './types'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) signupCredentialsDto: SignupDto): Promise<void> {
    return this.authService.signUp(signupCredentialsDto)
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signinCredentialsDto: SigninDto,
  ): Promise<{ accessToken: string; user: JwtPayload }> {
    return this.authService.signIn(signinCredentialsDto)
  }
}
