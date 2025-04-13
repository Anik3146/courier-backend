import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Merchant } from "./Merchant";
import { Agent } from "./Agent";
import { PickupMan } from "./PickupMan";
import { DeliveryMan } from "./DeliveryMan";
import { Operator } from "./Operator";

@Entity()
export class AppInfo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title?: string;

  @Column()
  subtitle?: string;

  @Column("text")
  description?: string;

  @Column()
  shareLink?: string;

  @Column()
  privacyPolicy?: string;

  @Column()
  latest_app_version?: string;

  @Column()
  latest_ios_version?: string;

  @Column()
  is_update_available?: boolean;

  @Column()
  update_note?: string;

  @Column()
  google_play_update_link?: string;

  @Column()
  app_store_update_link?: string;

  // ✅ Linking to Merchant (optional)
  @ManyToOne(() => Merchant, (merchant) => merchant.appInfos, {
    nullable: true,
  })
  merchant?: Merchant;

  // ✅ Linking to Agent (optional)
  @ManyToOne(() => Agent, (agent) => agent.appInfos, {
    nullable: true,
  })
  agent?: Agent;

  // ✅ Linking to PickupMan (optional)
  @ManyToOne(() => PickupMan, (pickupMan) => pickupMan.appInfos, {
    nullable: true,
  })
  pickupMan?: PickupMan;

  // ✅ Linking to DeliveryMan (optional)
  @ManyToOne(() => DeliveryMan, (deliveryMan) => deliveryMan.appInfos, {
    nullable: true,
  })
  deliveryMan?: DeliveryMan;

  // ✅ Linking to Operator (optional)
  @ManyToOne(() => Operator, (operator) => operator.appInfos, {
    nullable: true,
  })
  operator?: Operator;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
