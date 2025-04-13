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
export class DeviceInfo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name?: string;

  @Column()
  model?: string;

  @Column()
  manufacturer?: string;

  @Column()
  version?: string;

  @Column()
  brand?: string;

  @Column()
  fingerprint?: string;

  @Column()
  serial_number?: string;

  @Column()
  device_id?: string;

  @Column()
  IMEI?: string;

  @Column()
  latitude?: number;

  @Column()
  longitude?: number;

  // ✅ Linking DeviceInfo to Merchant
  @ManyToOne(() => Merchant, (merchant) => merchant.deviceInfos, {
    nullable: true,
  })
  merchant?: Merchant;

  // ✅ Linking DeviceInfo to Agent
  @ManyToOne(() => Agent, (agent) => agent.deviceInfos, {
    nullable: true,
  })
  agent?: Agent;

  // ✅ Linking DeviceInfo to PickupMan
  @ManyToOne(() => PickupMan, (pickupMan) => pickupMan.deviceInfos, {
    nullable: true,
  })
  pickupMan?: PickupMan;

  // ✅ Linking DeviceInfo to DeliveryMan
  @ManyToOne(() => DeliveryMan, (deliveryMan) => deliveryMan.deviceInfos, {
    nullable: true,
  })
  deliveryMan?: DeliveryMan;

  // ✅ Linking DeviceInfo to Operator
  @ManyToOne(() => Operator, (operator) => operator.deviceInfos, {
    nullable: true,
  })
  operator?: Operator;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
