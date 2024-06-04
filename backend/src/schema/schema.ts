import { integer, pgTable, serial, varchar, text, date, decimal, primaryKey } from "drizzle-orm/pg-core";
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