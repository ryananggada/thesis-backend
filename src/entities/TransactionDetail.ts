import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Transaction } from './Transaction';
import { Medicine } from './Medicine';

@Entity()
export class TransactionDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Transaction)
  @JoinColumn()
  transaction!: Transaction;

  @ManyToOne(() => Medicine)
  @JoinColumn()
  medicine!: Medicine;

  @Column()
  subtotal!: number;
}
