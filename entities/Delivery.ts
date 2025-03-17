import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Merchant } from "./Merchant";
import { Agent } from "./Agent";
import { PickupMan } from "./PickupMan";
import { DeliveryMan } from "./DeliveryMan";

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  store_name?: string;

  @Column()
  product_type?: string;

  @ManyToOne(() => Merchant, (merchant) => merchant.deliveries)
  merchant?: Merchant;

  @Column()
  recipient_name?: string;

  @Column()
  recipient_phone?: string;

  @Column({ nullable: true })
  recipient_secondary_phone?: string;

  @Column()
  address?: string;

  @Column()
  area?: string;

  @Column({ nullable: true })
  instructions?: string;

  @Column()
  delivery_type?: string;

  @Column({ type: "decimal" })
  total_weight?: number;

  @Column()
  quantity?: number;

  @Column({ type: "decimal" })
  amount_to_collect?: number;

  @Column({ type: "decimal" })
  price?: number;

  @Column()
  division?: string;

  @Column()
  zilla?: string;

  @Column()
  thana?: string;

  @Column({ default: "Pending" })
  delivery_status?: string;

  @Column({ default: "Pending" })
  pickup_status?: string;

  @ManyToOne(() => Agent)
  @JoinColumn({ name: "agent_id" })
  agent?: Agent;

  @ManyToOne(() => PickupMan)
  @JoinColumn({ name: "pickup_man_id" })
  pickupMan?: PickupMan;

  @ManyToOne(() => DeliveryMan)
  @JoinColumn({ name: "delivery_man_id" })
  deliveryMan?: DeliveryMan;

  @Column({ type: "decimal" })
  delivery_charge?: number;
}
