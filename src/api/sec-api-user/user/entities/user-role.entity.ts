import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user_role', schema: 'ods_optix' })
export class UserRole {
  @PrimaryGeneratedColumn()
  user_role_id: string;

  @Column()
  role_name: string;

  @Column({ default: false })
  scheduler_access: boolean;

  @Column({ default: false })
  control_access: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  update_at: Date;
}
