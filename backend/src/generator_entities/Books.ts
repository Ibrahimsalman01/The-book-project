import { Collection, Entity, ManyToMany, type Opt, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Genres } from './Genres';

@Entity()
export class Books {

  [PrimaryKeyProp]?: 'bookId';

  @PrimaryKey()
  bookId!: number;

  @Unique({ name: 'books_title_key' })
  @Property({ length: 100 })
  title!: string;

  @Property({ length: 50 })
  author!: string;

  @Property({ columnType: 'text' })
  synopsis!: string;

  @Property({ type: 'string', columnType: 'date', defaultRaw: `CURRENT_DATE` })
  datePublished!: string & Opt;

  @Property({ type: 'string', columnType: 'numeric(3,1)', defaultRaw: `0.0` })
  rating!: string & Opt;

  @Property({ length: 255, nullable: true })
  coverImage?: string;

  @ManyToMany({ entity: () => Genres, pivotTable: 'book_genres', joinColumn: 'book_id', inverseJoinColumn: 'genre_id' })
  bookGenres = new Collection<Genres>(this);

}
