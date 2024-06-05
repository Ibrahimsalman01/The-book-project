import { drizzle } from "drizzle-orm/node-postgres";
import { Books, completeBook, Genres, BookGenres, BookStories } from '../schema/schema.js';
import { sql, getTableColumns, eq  } from 'drizzle-orm';
import { DatabaseService } from "./database_services.js";

interface BookObject {
    bookId: number;
    title: string;
    author: string;
    synopsis: string;
    genres: string[];
    datePublished: string;
    rating: string;
    coverImage: string | null;
};

export class BookRepository {
  private db = DatabaseService.drizzleInit();

  public async createBook(currBook: completeBook): Promise<void> {
    try {
      const mainBook = await this.db.insert(Books).values(currBook).returning({bookId: Books.bookId});
      await this.createGenres(currBook, mainBook[0].bookId);
      await this.createStory(currBook, mainBook[0].bookId);
    } catch (error) {
      console.error(`Unable to add new book due to: ${error}`);
    }
  }

public async createGenres(currBook: completeBook, book_id: number): Promise<void> {
    try {
      const genresArray = currBook.genres;
      for (const currGenre of genresArray) {
        await this.checkAndAddGenre(currGenre, book_id);
      }
    } catch (error) {
      console.error(`Error creating genres: ${error}`);
    }
  }

private async checkAndAddGenre(genreString: string, bookId: number): Promise<void> {
    try {
        const checkGenre = await this.db
        .select({ genreId: Genres.genreId, genre: Genres.genre })
        .from(Genres)
        .where(eq(Genres.genre, genreString)) //code here is looking for genre row where genre is same as genrestring
         
        console.log(checkGenre);

        let genreId: number;

      if (checkGenre.length == 0) { //returns as array [] for some reason so check if empty or not
        const newGenre = {
            genre: genreString
        };

        const insertedGenre = await this.db.insert(Genres).values(newGenre).returning({genreId: Genres.genreId});
        genreId = insertedGenre[0].genreId;
        console.log(genreId+' ID FROM IF NOT IN TABLE')
      } else { //if already in genres table
        genreId = checkGenre[0].genreId;
        console.log(genreId+' ID IF IN TABLE')
      }

      const newBookGenre = { bookId, genreId };
      await this.db.insert(BookGenres).values(newBookGenre);
    } catch (error) {
      console.error(`Error checking/adding genre: ${error}`);
    }
  }

public async createStory(currBook: completeBook, bookId: number): Promise<void> {
    try {
      const newBookStory = {
        bookId: bookId,
        story: currBook.story,
      };

      await this.db.insert(BookStories).values(newBookStory);
    } catch (error) {
      console.error(`Error creating story: ${error}`);
    }
  } 


public async getAllBooks(): Promise<BookObject[]> {
	const result = await this.db.query.Books.findMany({
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

    const returnedBooks: BookObject[] = result.map(b => ({
        bookId: b.bookId,
        title: b.title,
        author: b.author,
        synopsis: b.synopsis,
        genres: b.bookGenres.map(bg => bg.genre.genre),
        datePublished: b.datePublished,
        rating: b.rating,
        coverImage: b.coverImage
    }));

    //console.log(JSON.stringify(returnedBooks, null, 3));

    return returnedBooks;
};

public async getBook(bookId: number): Promise<BookObject> {
    const result = await this.db.query.Books.findFirst({
        with: {
            bookGenres: {
                columns: {
                    bookId: false,
                    genreId: false
                },
                with: {
                    genre: {
                        columns: {
                            genreId: false,
                            genre: true
                        }
                    }
                }
            }
        },
        where: eq(Books.bookId, bookId)
    });

    const returnedBook: BookObject = {
        bookId: result.bookId,
        title: result.title,
        author: result.author,
        synopsis: result.synopsis,
        genres: result.bookGenres.map(bg => bg.genre.genre),
        datePublished: result.datePublished,
        rating: result.rating,
        coverImage: result.coverImage
    };

    
    //console.log(JSON.stringify(returnedBook, null, 3));
    return returnedBook;
};


}
