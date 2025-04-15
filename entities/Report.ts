// src/entities/Report.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_type!: string;

  @Column("text")
  issue!: string;

  @CreateDateColumn()
  created_at!: Date;
}
