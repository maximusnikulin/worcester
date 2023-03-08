import { EntityRepository, Repository } from 'typeorm'

import { Auth } from '../entities/auth.entity'

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  async updateToken(params: { userId: number; token: string }): Promise<Auth> {
    const { token, userId } = params
    // TODO: need add secure
    await this.update({ id: userId }, { token })
    return this.findOne({ id: userId })
  }
}
