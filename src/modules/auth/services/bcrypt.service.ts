import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptService {
  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }

  async genSalt(): Promise<string> {
    return bcrypt.genSalt()
  }
}
