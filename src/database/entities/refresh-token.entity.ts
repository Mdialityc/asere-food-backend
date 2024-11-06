import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'refresh_tokens' })
export default class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({unique: true})
  userId: number;

  @Column()
  refreshToken: string;
}