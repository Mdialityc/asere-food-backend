import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'confirmation_tokens' })
export default class ConfirmationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({unique: true})
  userId: number;

  @Column()
  confirmationToken: string;
}