import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Merchant } from "./Merchant";
import { Agent } from "./Agent";
import { PickupMan } from "./PickupMan";
import { DeliveryMan } from "./DeliveryMan";
import { Operator } from "./Operator";

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  activity?: string;

  @Column()
  activity_time?: Date;

  @Column()
  newAppuserId?: string;

  @Column()
  email?: string;

  @Column()
  phone_no?: string;

  @Column()
  device_id?: string;

  @Column()
  IMEI?: string;

  @Column()
  latitude?: number;

  @Column()
  longitude?: number;

  // Link to Merchant
  @ManyToOne(() => Merchant, (merchant) => merchant.activityLogs, {
    nullable: true,
  })
  merchant?: Merchant;

  // Link to Agent
  @ManyToOne(() => Agent, (agent) => agent.activityLogs, { nullable: true })
  agent?: Agent;

  // Link to PickupMan
  @ManyToOne(() => PickupMan, (pickupMan) => pickupMan.activityLogs, {
    nullable: true,
  })
  pickupMan?: PickupMan;

  // Link to DeliveryMan
  @ManyToOne(() => DeliveryMan, (deliveryMan) => deliveryMan.activityLogs, {
    nullable: true,
  })
  deliveryMan?: DeliveryMan;

  // ✅ Link to Operator
  @ManyToOne(() => Operator, (operator) => operator.activityLogs, {
    nullable: true,
  })
  operator?: Operator;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
