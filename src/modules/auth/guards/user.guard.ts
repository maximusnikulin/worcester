import { CanActivate } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export const UserGuard = () =>
  class extends AuthGuard() implements CanActivate {}
