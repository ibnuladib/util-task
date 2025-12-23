import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
@Index(['isActive'], { unique: true, where: `"isActive" = true` })
export class Pricing{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  ratePerUnit: number;

  @Column('decimal', { precision: 5, scale: 2 })
  vatPercentage: number;

  @Column('decimal', { precision: 10, scale: 2 })
  serviceCharge: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
