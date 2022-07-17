import * as bcrypt from 'bcrypt'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

@Entity()
@Unique(['username'])
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  username: string

  @Column({ type: 'varchar' })
  password: string

  @Column()
  salt: string

  @Column({ nullable: true })
  token: string

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }

  async validateToken(token: string): Promise<boolean> {
    // const hash = await bcrypt.hash(token, this.salt)
    return token === this.token
  }
}
