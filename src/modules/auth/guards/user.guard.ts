import { CanActivate, ExecutionContext } from '@nestjs/common'
// import { PassportModule } from '@nestjs/passport'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

export const UserGuard = () =>
  class extends AuthGuard() implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      return super.canActivate(context)
    }
  }
