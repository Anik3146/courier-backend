import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Thana } from "./Thana";
import { PickupMan } from "./PickupMan";
import { DeliveryMan } from "./DeliveryMan";
import { Delivery } from "./Delivery";

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
}
