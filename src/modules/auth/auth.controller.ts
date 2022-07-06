import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'

import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'
import { Auth } from './entities/auth.entity'
import { AuthService } from './services/auth.service'
import { JwtPayload } from './types'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body(ValidationPipe) signupCredentialsDto: SignupDto): Promise<Auth> {
    return this.authService.signUp(signupCredentialsDto)
  }

  @Post('signin')
  signIn(
    @Body(ValidationPipe) signinCredentialsDto: SigninDto,
  ): Promise<{ accessToken: string; payload: JwtPayload }> {
    return this.authService.signIn(signinCredentialsDto)
  }
}
