import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Delivery } from "./Delivery";

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Delivery)
  @JoinColumn({ name: "delivery_id" })
  delivery?: Delivery;

  @Column({ type: "decimal" })
  total_amount?: number;

  @Column({ type: "decimal" })
  delivery_charge?: number;

  @Column({ type: "decimal" })
  cod_fee?: number;

  @Column({ type: "decimal" })
  collected_amount?: number;

  @Column({ type: "decimal" })
  receivable_amount?: number;

  @Column({
    type: "enum",
    enum: ["Processing", "Paid"],
    default: "Processing",
  })
  payment_status?: "Processing" | "Paid";

  @CreateDateColumn()
  issued_at?: Date;
}
