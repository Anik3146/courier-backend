import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { District } from "./District";
import { Thana } from "./Thana";
import { Agent } from "./Agent";
import { AppInfo } from "./AppInfo";
import { ActivityLog } from "./ActivityLog";
import { DeviceInfo } from "./DeviceInfo";

@Entity()
export class Operator {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @ManyToMany(() => District, (district) => district.operators)
  @JoinTable()
  districts!: District[];

  @ManyToMany(() => Thana, (thana) => thana.operators)
  @JoinTable()
  thanas!: Thana[];

  @OneToMany(() => Agent, (agent) => agent.operator)
  agents!: Agent[];

  // ✅ AppInfos linked to this Operator
  @OneToMany(() => AppInfo, (appInfo) => appInfo.operator)
  appInfos?: AppInfo[];

  // ✅ Activity Logs linked to this Operator
  @OneToMany(() => ActivityLog, (activityLog) => activityLog.operator)
  activityLogs?: ActivityLog[];

  // ✅ Device Info linked to this Operator
  @OneToMany(() => DeviceInfo, (deviceInfo) => deviceInfo.operator)
  deviceInfos?: DeviceInfo[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
