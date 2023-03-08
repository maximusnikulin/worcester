import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { RequestWithUser } from 'src/types/requests'

import { UserGuard } from '@modules/auth/guards/user.guard'

import { AppService } from './app.service'

@ApiTags('Check Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello()
  }

  @ApiBearerAuth()
  @UseGuards(UserGuard())
  @Get('private-hello')
  getPrivateHello(@Req() req: RequestWithUser): string {
    return this.appService.getHello()
  }
}
