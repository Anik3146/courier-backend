import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  store_name?: string;

  @Column()
  contact_number?: string;

  @Column()
  store_contact_name?: string;

  @Column({ nullable: true })
  secondary_contact_number?: string;

  @Column()
  city?: string;

  @Column()
  zone?: string;

  @Column()
  address?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
