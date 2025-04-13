import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Merchant } from "./Merchant";

@Entity()
export class Promo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string;

  @Column("decimal", { precision: 5, scale: 2 })
  discount!: number;

  @Column({ type: "date" })
  deadline!: string;

  @Column({ default: true })
  active_status!: boolean;

  @ManyToMany(() => Merchant, (user) => user.promos)
  users!: Merchant[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
