import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Merchant } from "./Merchant";

@Entity()
export class Withdrawal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id?: number;

  @Column()
  user_type?: "agent" | "pickup_man" | "delivery_man" | "merchant";

  @Column({ type: "decimal" })
  amount?: number;

  @Column()
  withdraw_method?: "bkash" | "bank" | "nagad";

  @Column({ default: "pending" })
  status?: "pending" | "completed";

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;
}
