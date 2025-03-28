import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Agent } from "./Agent";
import { Thana } from "./Thana";

@Entity()
export class PickupMan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name?: string;

  @Column({ type: "decimal", default: 0 })
  balance?: number;

  @ManyToOne(() => Agent, (agent) => agent.pickupMen)
  agent?: Agent;

  @ManyToOne(() => Thana, (thana) => thana.agents)
  thana?: Thana;
}
