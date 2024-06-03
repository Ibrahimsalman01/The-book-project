import { Entity, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Users {

  [PrimaryKeyProp]?: 'userId';

  @PrimaryKey()
  userId!: number;

  @Unique({ name: 'users_username_key' })
  @Property({ length: 64 })
  username!: string;

  @Unique({ name: 'users_email_key' })
  @Property({ length: 120 })
  email!: string;

  @Property({ length: 256, nullable: true })
  passwordHash?: string;

}
