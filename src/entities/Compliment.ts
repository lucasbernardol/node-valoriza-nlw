import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { v4 as uuid4 } from 'uuid';

import { Tag } from './Tag';
import { User } from './User';

@Entity({ name: 'compliments' })
export class Compliment {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  message: string;

  @Column()
  senderId: string;

  @JoinColumn({ name: 'senderId' })
  @ManyToOne(() => User)
  sender: User;

  @Column()
  receiverId: string;

  @JoinColumn({ name: 'receiverId' })
  @ManyToOne(() => User)
  receiver: User;

  @Column()
  tagId: string;

  @JoinColumn({ name: 'tagId' })
  @ManyToOne(() => Tag)
  tag: Tag;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
