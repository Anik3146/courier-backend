import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Agent } from "./Agent";
import { Thana } from "./Thana";
import { Message } from "./Message";
import { AppInfo } from "./AppInfo";
import { ActivityLog } from "./ActivityLog";
import { DeviceInfo } from "./DeviceInfo";

@Entity()
export class DeliveryMan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name?: string;

  @Column({ type: "decimal", default: 0 })
  balance?: number;

  @ManyToOne(() => Agent, (agent) => agent.deliveryMen)
  agent?: Agent;

  @ManyToOne(() => Thana, (thana) => thana.agents)
  thana?: Thana;

  @OneToMany(() => Message, (message) => message.deliveryManSender)
  sentMessages?: Message[];

  @OneToMany(() => Message, (message) => message.deliveryManReceiver)
  receivedMessages?: Message[];

  // ✅ AppInfos linked to this DeliveryMan
  @OneToMany(() => AppInfo, (appInfo) => appInfo.deliveryMan)
  appInfos?: AppInfo[];

  // ✅ Activity Logs linked to this DeliveryMan
  @OneToMany(() => ActivityLog, (activityLog) => activityLog.deliveryMan)
  activityLogs?: ActivityLog[];

  // ✅ Device Info linked to this DeliveryMan
  @OneToMany(() => DeviceInfo, (deviceInfo) => deviceInfo.deliveryMan)
  deviceInfos?: DeviceInfo[];
}
