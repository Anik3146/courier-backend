import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class PricingPlan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  parcel_type?: string;

  @Column({ nullable: true })
  pickup_location?: string;

  @Column({ nullable: true })
  delivery_location?: string;

  @Column({ type: "decimal", nullable: true })
  weight?: number;

  @Column({ nullable: true })
  delivery_time?: string;

  @Column({ type: "decimal", nullable: true })
  price?: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
