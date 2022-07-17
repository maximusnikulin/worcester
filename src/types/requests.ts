import { Request } from 'express'

import { Auth } from '@modules/auth/entities/auth.entity'
export interface RequestWithUser extends Request {
  user: Auth
}
