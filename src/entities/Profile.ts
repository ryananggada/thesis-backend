import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

export enum GenderType {
  MALE = 'M',
  FEMALE = 'F',
}

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  first_name!: string;

  @Column({ nullable: false })
  last_name!: string;

  @Column({ nullable: false, type: 'enum', enum: GenderType })
  gender!: GenderType;

  @Column({ nullable: false })
  date_of_birth!: Date;

  @Column({ nullable: false })
  address!: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user!: User;
}
