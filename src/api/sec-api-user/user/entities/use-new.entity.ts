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
import { UserRole } from './user-role.entity';

@Entity({ name: 'user_new', schema: 'ods_optix' })
export class UserNew {
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

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  update_at: Date;

  @ManyToOne(() => Org, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'org_id' })
  org: Org;

  @ManyToOne(() => UserRole)
  @JoinColumn({ name: 'user_role_id' })
  user_role: UserRole;
}
