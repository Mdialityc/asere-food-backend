import { Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Permission from './permission.entity';
import User from './user.entity';

@Entity({ name: 'roles' })
export default class Role{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {length: 255})
  @Index({unique: true})
  name: string;

  @Column('character varying', {length: 255, nullable: true})
  description?: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @Column('boolean')
  isActive: boolean;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[];
}