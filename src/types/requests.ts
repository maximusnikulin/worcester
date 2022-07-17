import { Auth } from '@modules/auth/entities/auth.entity'

export interface RequestWithUser extends Request {
  user: Pick<Auth, 'username' | 'id'>
}
