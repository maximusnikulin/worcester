import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  getMyHello(): string {
    return 'Hello World with private data!'
  }
}
