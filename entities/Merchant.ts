import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Delivery } from "./Delivery";
import { Message } from "./Message";
import { Promo } from "./Promo";
import { AppInfo } from "./AppInfo";
import { ActivityLog } from "./ActivityLog";
import { DeviceInfo } from "./DeviceInfo";

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_name?: string;

  @Column()
  owner_name?: string;

  @Column()
  mobile_number?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @Column({ type: "decimal", default: 0 })
  balance?: number;

  @OneToMany(() => Delivery, (delivery) => delivery.merchant)
  deliveries?: Delivery[];

  @OneToMany(() => Message, (message) => message.merchantSender)
  sentMessages?: Message[];

  @OneToMany(() => Message, (message) => message.merchantReceiver)
  receivedMessages?: Message[];

  @ManyToMany(() => Promo, (promo) => promo.users, { cascade: true })
  @JoinTable()
  promos!: Promo[];

  // ✅ Relating Merchant to AppInfo
  @OneToMany(() => AppInfo, (appInfo) => appInfo.merchant)
  appInfos?: AppInfo[];

  // ✅ Activity Logs
  @OneToMany(() => ActivityLog, (activityLog) => activityLog.merchant)
  activityLogs?: ActivityLog[];

  // ✅ Device Info
  @OneToMany(() => DeviceInfo, (deviceInfo) => deviceInfo.merchant)
  deviceInfos?: DeviceInfo[];
}
