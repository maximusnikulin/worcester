import { JwtModuleAsyncOptions } from '@nestjs/jwt'

import getEnv from './env.config'

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    const { JWT_EXIPRES, JWT_SECRET } = getEnv()
    return {
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: +JWT_EXIPRES,
      },
    }
  },
}
