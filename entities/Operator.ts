import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { District } from "./District";
import { Thana } from "./Thana";
import { Agent } from "./Agent";

@Entity()
export class Operator {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @ManyToMany(() => District, (district) => district.operators)
  @JoinTable()
  districts!: District[];

  @ManyToMany(() => Thana, (thana) => thana.operators)
  @JoinTable()
  thanas!: Thana[];

  @OneToMany(() => Agent, (agent) => agent.operator)
  agents!: Agent[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
