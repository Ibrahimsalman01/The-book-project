import { integer, pgTable, serial, varchar, text, date, decimal, primaryKey, uniqueIndex } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// schemas
export const Books = pgTable('books', {
	bookId: serial('book_id').primaryKey(),
	title: varchar('title', { length: 100 }).unique(),
	author: varchar('author', { length: 50 }),
	synopsis: text('synopsis').notNull(),
	datePublished: date('date_published').default(sql`CURRENT_DATE`).notNull(),
	rating: decimal('rating', { precision: 3, scale: 1 }).default(sql`0.0`).notNull(),
	coverImage: varchar('cover_image', { length: 255 })
});


export type pushedBook = typeof Books.$inferInsert;
export type completeBook = pushedBook & { //Adding genres and stories this way so they do not get attempted to be pushed to Books table
    genres: string[];
    story: string;
}  

export const BookRelations = relations(Books, ({ many }) => ({
	bookGenres: many(BookGenres)
}));

export const Genres = pgTable('genres', {
  genreId: serial('genre_id').primaryKey(),
  genre: varchar('genre', { length: 40 }).unique().notNull()
});

export const GenreRelations = relations(Genres, ({ many }) => ({
	books: many(BookGenres)
}));

export const BookGenres = pgTable('book_genres', {
  bookId: integer('book_id').references(() => Books.bookId, { onDelete: 'cascade' }),
  genreId: integer('genre_id').references(() => Genres.genreId, { onDelete: 'cascade' })
},
(table) => ({
  pk: primaryKey({ columns: [table.bookId, table.genreId] })
}));

export const BookGenresRelations = relations(BookGenres, ({ one }) => ({
	book: one(Books, {
		fields: [BookGenres.bookId],
		references: [Books.bookId]
	}),

	genre: one(Genres, {
		fields: [BookGenres.genreId],
		references: [Genres.genreId]
	})
}));

export const BookStories = pgTable('book_stories', {
	bookId: integer('book_id').references(() => Books.bookId, { onDelete: 'cascade' }),
	storyId: serial('story_id').primaryKey(),
	story: text('story').notNull() 
});

export const Users = pgTable('users', {
	userId: serial('user_id').primaryKey(),
	username: varchar('username', { length: 64 }).unique().notNull(),
	email: varchar('email', { length: 120 }).unique().notNull(),
	password: varchar('password_hash', { length: 256 }).notNull(),

})

export type completeUser = typeof Users.$inferInsert;

export const Novels = pgTable('novels', {
  novelId: serial('novel_id').primaryKey(),
  seriesName: varchar('series_name', { length: 255 }).notNull(),
  chapterNumber: integer('chapter_number').notNull(),
  pageNumber: integer('page_number').notNull(),
  fileUrl: text('file_url').notNull()
}, (table) => {
  return {
    uniqueIndex: uniqueIndex('series_chapter_page_unique_idx').on(table.seriesName, 
      table.chapterNumber, table.pageNumber)
  };
});
