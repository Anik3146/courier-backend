import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Agent } from "./Agent";
import { Operator } from "./Operator";

@Entity()
export class Thana {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  thana_name?: string;

  @OneToMany(() => Agent, (agent) => agent.thana)
  agents?: Agent[];

  // Inside the Thana entity class
  @ManyToMany(() => Operator, (operator) => operator.thanas)
  operators!: Operator[];
}
