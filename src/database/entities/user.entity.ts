import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity, Index, ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import Role from './role.entity';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', {length: 255})
  name: string;

  @Column('character varying', {length: 255})
  lastnames: string;

  @Column('character varying', { length: 255 })
  username: string;

  @Column('character varying', { length: 255 })
  @Index({unique: true})
  email: string;

  @Column('character varying', { length: 255 })
  phoneNumber: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users, {onDelete: 'CASCADE' })
  role: Role;

  @Column('boolean')
  isActive: boolean;

  @Column('boolean')
  isConfirmed: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
  }
}
