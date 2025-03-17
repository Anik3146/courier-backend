import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Delivery } from "./Delivery";

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_name?: string;

  @Column()
  owner_name?: string;

  @Column()
  mobile_number?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @Column({ type: "decimal", default: 0 })
  balance?: number;

  @OneToMany(() => Delivery, (delivery) => delivery.merchant)
  deliveries?: Delivery[];
}
