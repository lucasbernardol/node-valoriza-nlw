import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
  AfterLoad,
} from 'typeorm';

import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { v4 as uuid4 } from 'uuid';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * @description Encryption salt (bcrypt)
   */
  private readonly hashSalt: 10;

  @Exclude()
  private temporaryPassword: string;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }

  /**
   * @description Compare passwords (bcrypt)
   */
  public async compare(plain: string | Buffer) {
    return bcrypt.compare(plain, this.password);
  }

  @AfterLoad()
  public createTemporaryPassword() {
    this.temporaryPassword = this.password;
  }

  @BeforeUpdate()
  @BeforeInsert()
  public async hash() {
    if (this.temporaryPassword === this.password) {
      return false;
    }

    try {
      const salt = await bcrypt.genSalt(this.hashSalt);

      const hash = await bcrypt.hash(this.password, salt);

      this.password = hash;

      return true;
    } catch (error) {
      console.warn(error);
    }
  }
}
