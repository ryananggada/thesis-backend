import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Symptom } from './Symptom';

@Entity()
export class Medicine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  price!: number;

  @ManyToOne(() => Symptom)
  @JoinColumn()
  symptom!: Symptom;
}
