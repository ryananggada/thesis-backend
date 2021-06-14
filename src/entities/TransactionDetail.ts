import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  Column,
  JoinColumn,
} from 'typeorm';
import { Transaction } from './Transaction';
import { Medicine } from './Medicine';

@Entity()
export class TransactionDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Transaction, { cascade: true })
  @JoinColumn()
  transaction!: Transaction;

  @ManyToOne(() => Medicine, { cascade: true })
  @JoinColumn()
  medicine!: Medicine;

  @Column()
  subtotal!: number;
}
