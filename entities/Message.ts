// Message.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Merchant } from "./Merchant";
import { Agent } from "./Agent";
import { PickupMan } from "./PickupMan";
import { DeliveryMan } from "./DeliveryMan";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @CreateDateColumn()
  timestamp!: Date;

  @Column()
  senderType!: "merchant" | "agent" | "pickupMan" | "deliveryMan";

  @Column()
  senderId!: number;

  @Column()
  receiverType!: "merchant" | "agent" | "pickupMan" | "deliveryMan";

  @Column()
  receiverId!: number;

  // Backward relationships for sender
  @ManyToOne(() => Merchant, (merchant) => merchant.sentMessages, {
    nullable: true,
  })
  merchantSender?: Merchant;

  @ManyToOne(() => Agent, (agent) => agent.sentMessages, { nullable: true })
  agentSender?: Agent;

  @ManyToOne(() => PickupMan, (pickupMan) => pickupMan.sentMessages, {
    nullable: true,
  })
  pickupManSender?: PickupMan;

  @ManyToOne(() => DeliveryMan, (deliveryMan) => deliveryMan.sentMessages, {
    nullable: true,
  })
  deliveryManSender?: DeliveryMan;

  // Backward relationships for receiver
  @ManyToOne(() => Merchant, (merchant) => merchant.receivedMessages, {
    nullable: true,
  })
  merchantReceiver?: Merchant;

  @ManyToOne(() => Agent, (agent) => agent.receivedMessages, { nullable: true })
  agentReceiver?: Agent;

  @ManyToOne(() => PickupMan, (pickupMan) => pickupMan.receivedMessages, {
    nullable: true,
  })
  pickupManReceiver?: PickupMan;

  @ManyToOne(() => DeliveryMan, (deliveryMan) => deliveryMan.receivedMessages, {
    nullable: true,
  })
  deliveryManReceiver?: DeliveryMan;
}
