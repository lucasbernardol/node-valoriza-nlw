import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';
import { v4 as uuid4 } from 'uuid';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose({ name: 'customId' })
  public createCustomId(): string {
    return `#${this.name}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
