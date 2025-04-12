import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { District } from "./District";
import { Area } from "./Area";

@Entity()
export class Zone {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => District, (district) => district.zones)
  district!: District;

  @OneToMany(() => Area, (area) => area.zone)
  areas!: Area[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
