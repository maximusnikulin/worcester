import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RequestWithUser } from 'src/types/requests'

import { SigninDto } from './dto/signin.dto'
import { SignupDto } from './dto/signup.dto'
import { UserGuard } from './guards/user.guard'
import { AuthService } from './services/auth.service'
import { JwtPayload, LogoutResponse, SignUpResponse } from './types'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(
    @Body(ValidationPipe) signupCredentialsDto: SignupDto,
  ): Promise<SignUpResponse> {
    return this.authService.signUp(signupCredentialsDto)
  }

  @HttpCode(200)
  @Post('signin')
  signIn(
    @Body(ValidationPipe) signinCredentialsDto: SigninDto,
  ): Promise<{ accessToken: string; payload: JwtPayload }> {
    return this.authService.signIn(signinCredentialsDto)
  }

  @HttpCode(200)
  @Post('logout')
  @UseGuards(UserGuard())
  logout(@Req() req: RequestWithUser): Promise<LogoutResponse> {
    return this.authService.logout(req.user.id)
  }
}
