import { dbUrl } from "./utils/database.config.js";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/schema.js";
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: dbUrl,
	ssl: true
});

const db = drizzle(pool, { schema });

const getAllBooks = async () => {
	const result = await db.query.Books.findMany({
		with: {
			bookGenres: {
				columns: {
					bookId: false,
					genreId: false
				},
				with: {
					genre: {
						columns: {
							genre: true,
							genreId: false
						}
					}
				}
			}
		}
	});

	const reducedBooks = result.reduce((acc, row) => {
		if (!acc[row.bookId]) {
			acc[row.bookId] = {
				bookId: row.bookId,
				title: row.title,
				author: row.author,
				synopsis: row.synopsis,
				genres: [],
				datePublished: row.datePublished,
				rating: row.rating,
				coverImage: row.coverImage
			};
		}
	
		if (row.bookGenres) {
			for (const bookGenre of row.bookGenres) {
				if (bookGenre.genre && bookGenre.genre.genre) {
					acc[row.bookId].genres.push(bookGenre.genre.genre);
				}
			}
		}
	
		return acc;
	}, {});

	const booksArray = Object.values(reducedBooks);

	console.log(booksArray);
	
	pool.end();
};

getAllBooks();