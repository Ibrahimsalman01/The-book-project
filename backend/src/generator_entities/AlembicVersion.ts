import { Entity, PrimaryKey, PrimaryKeyProp } from '@mikro-orm/core';

@Entity()
export class AlembicVersion {

  [PrimaryKeyProp]?: 'versionNum';

  @PrimaryKey({ length: 32 })
  versionNum!: string;

}
