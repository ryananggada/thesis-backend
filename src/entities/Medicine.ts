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

  @ManyToOne(() => Symptom)
  @JoinColumn()
  symptom!: Symptom;

  @Column({ nullable: false })
  price!: number;

  @Column('text', { nullable: false })
  description!: string;

  @Column({ nullable: false })
  image_url!: string;

  @Column({ nullable: false })
  composition!: string;

  @Column({ nullable: false })
  manufacturer!: string;

  @Column({ nullable: false })
  indication!: string;
}
