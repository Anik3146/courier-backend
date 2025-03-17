import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Agent } from "./Agent";

@Entity()
export class Thana {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  thana_name?: string;

  @OneToMany(() => Agent, (agent) => agent.thana)
  agents?: Agent[];
}
