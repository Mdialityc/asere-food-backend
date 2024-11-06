import { Column, Entity, Index, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Role from './role.entity';

@Entity({ name: 'permissions' })
export default class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {length: 255})
  @Index({unique: true})
  name: string;

  @Column('character varying', {length: 255, nullable: true})
  description?: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}