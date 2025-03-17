import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class DeliveryCharge {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  area?: string;

  @Column({ type: "decimal" })
  charge?: number;
}
