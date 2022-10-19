import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'org', schema: 'ods_optix' })
export class Org {
  @PrimaryGeneratedColumn()
  org_id: number;

  @Column()
  org_type: string;

  @Column()
  name: string;

  @Column()
  name_chi: string;

  @Column()
  estimated_stuff: string;

  @Column()
  lat: string;

  @Column()
  lon: string;

  @Column()
  include_in_eo: boolean;

  @Column()
  short_name: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  update_at: Date;
}
