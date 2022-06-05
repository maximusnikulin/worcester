import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  getHelloAuth(): string {
    return 'Hello World from auth!'
  }
}
