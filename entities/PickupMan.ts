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
export class PickupMan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name?: string;

  @Column({ type: "decimal", default: 0 })
  balance?: number;

  @ManyToOne(() => Agent, (agent) => agent.pickupMen)
  agent?: Agent;

  @ManyToOne(() => Thana, (thana) => thana.agents)
  thana?: Thana;

  @OneToMany(() => Message, (message) => message.pickupManSender)
  sentMessages?: Message[];

  @OneToMany(() => Message, (message) => message.pickupManReceiver)
  receivedMessages?: Message[];

  // ✅ AppInfos linked to this PickupMan
  @OneToMany(() => AppInfo, (appInfo) => appInfo.pickupMan)
  appInfos?: AppInfo[];

  // ✅ Activity Logs linked to this PickupMan
  @OneToMany(() => ActivityLog, (activityLog) => activityLog.pickupMan)
  activityLogs?: ActivityLog[];

  // ✅ Device Info linked to this PickupMan
  @OneToMany(() => DeviceInfo, (deviceInfo) => deviceInfo.pickupMan)
  deviceInfos?: DeviceInfo[];
}
