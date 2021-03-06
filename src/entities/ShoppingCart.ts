import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Medicine } from './Medicine';
import { User } from './User';

@Entity()
export class ShoppingCart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User;

  @ManyToOne(() => Medicine)
  @JoinColumn()
  medicine!: Medicine;
}
