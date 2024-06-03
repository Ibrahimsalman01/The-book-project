import { Entity, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Genres {

  [PrimaryKeyProp]?: 'genreId';

  @PrimaryKey()
  genreId!: number;

  @Unique({ name: 'genres_genre_key' })
  @Property({ length: 40 })
  genre!: string;

}
