import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Thana } from "./Thana";
import { PickupMan } from "./PickupMan";
import { DeliveryMan } from "./DeliveryMan";
import { Delivery } from "./Delivery";
import { Message } from "./Message";
import { Operator } from "./Operator";
import { AppInfo } from "./AppInfo";
import { ActivityLog } from "./ActivityLog";
import { DeviceInfo } from "./DeviceInfo";

@Entity()
export class Agent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name?: string;

  @Column({ type: "decimal", default: 0 })
  balance?: number;

  @ManyToOne(() => Thana, (thana) => thana.agents)
  thana?: Thana;

  @OneToMany(() => PickupMan, (pickupMan) => pickupMan.agent)
  pickupMen?: PickupMan[];

  @OneToMany(() => DeliveryMan, (deliveryMan) => deliveryMan.agent)
  deliveryMen?: DeliveryMan[];

  @OneToMany(() => Delivery, (delivery) => delivery.agent)
  deliveries?: Delivery[];

  @OneToMany(() => Message, (message) => message.agentSender)
  sentMessages?: Message[];

  @OneToMany(() => Message, (message) => message.agentReceiver)
  receivedMessages?: Message[];

  @ManyToOne(() => Operator, (operator) => operator.agents, { nullable: true })
  @JoinColumn()
  operator!: Operator;

  // ✅ AppInfos linked to this Agent
  @OneToMany(() => AppInfo, (appInfo) => appInfo.agent)
  appInfos?: AppInfo[];

  // ✅ Activity Logs linked to this Agent
  @OneToMany(() => ActivityLog, (activityLog) => activityLog.agent)
  activityLogs?: ActivityLog[];

  // ✅ Device Info linked to this Agent
  @OneToMany(() => DeviceInfo, (deviceInfo) => deviceInfo.agent)
  deviceInfos?: DeviceInfo[];
}
