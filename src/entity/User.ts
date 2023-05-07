import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import Dept from './Dept';

@Entity('users')
@Unique(['email'])
export default class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  username!: string;

  @OneToOne((type) => Dept, {
    cascade: true,
  })
  @JoinColumn()
  dept!: Dept;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
