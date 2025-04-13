import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Zone } from "./Zone";
import { Operator } from "./Operator";

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Zone, (zone) => zone.district)
  zones!: Zone[];

  // Inside the District entity class
  @ManyToMany(() => Operator, (operator) => operator.districts)
  operators!: Operator[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
