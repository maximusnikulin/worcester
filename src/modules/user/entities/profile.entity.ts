import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: true })
  photo: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ default: 0 })
  rate: number
}
