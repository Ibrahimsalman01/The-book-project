import { Entity, ManyToOne, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Books } from './Books';

@Entity()
export class BookStories {

  [PrimaryKeyProp]?: 'storyId';

  @ManyToOne({ entity: () => Books, fieldName: 'book_id', deleteRule: 'cascade', nullable: true })
  book?: Books;

  @PrimaryKey()
  storyId!: number;

  @Property({ columnType: 'text' })
  story!: string;

}
