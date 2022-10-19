import { Org } from './org.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user', schema: 'ods_optix' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: string;

  @Column({ nullable: false, unique: true })
  cognito_username: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  email2: string;

  @Column()
  nickname: string;

  @Column()
  gender: string;

  @Column()
  mobile: string;

  @Column()
  post: string;

  @Column({ default: true, nullable: false })
  is_active: boolean;

  @Column({ default: true, nullable: false })
  is_org_admin: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  update_at: Date;

  @Column({ nullable: true })
  send_notif: boolean;

  @ManyToOne(() => Org, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'org_id' })
  org: Org;
}
