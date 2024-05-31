import { EntityManager } from "@mikro-orm/core";
import { DatabaseService } from "./database_services";
import { MikroORM } from "@mikro-orm/postgresql";
import { Book } from "../entities/book.entity";
import { Genre } from "../entities/genre.entity";
import { BookGenre } from "../entities/book_genres.entity";
import { BookStory } from "../entities/book_stories.entity";
import config from "../mikro-orm.config";


export class BookRepository {
    private em: EntityManager;

    constructor() {
        this.em = DatabaseService.getEntityManager();
    }


    public async pushBook(currBook: Book): Promise<void> {
        try {
            await this.em.persistAndFlush(currBook);
        } catch (error) {
            console.error(`Unable to add new book due to: ${error}`);
        } /* finally {
            await this.closeORM()
            console.log("CONSOLELOG FROM PUSH BOOKS")
        } */
    }

    public async pushGenres(currBook: Book): Promise<void> {
        //await this.init();
        console.log("CONSOLELOG FROM PUSH GENRES")
        const currBookId = currBook.bookId;
        const genresArray = currBook.genres;
    
        for (const currGenre of genresArray) {
            let checkGenre = await this.em.findOne(Genre, { genre: currGenre });
            console.log(checkGenre)
            if (!checkGenre) { //if genre does not exist
                const newGenre = new Genre(currGenre);
                await this.em.persistAndFlush(newGenre)
                .then(async () => {
                    // ! operator to TS that those values can not be null
                    const bookGenre = new BookGenre(currBookId!, newGenre.genreId!); //create book genre
                    await this.em.persistAndFlush(bookGenre) //push book genre to table
                });
            } else { //if genre exists
                const bookGenre = new BookGenre(currBookId!, checkGenre.genreId!);
                await this.em.persistAndFlush(bookGenre)
            }
        }
    }

    public async pushStories(currBook: Book): Promise<void> {
        const newBookStory = new BookStory(currBook.story, { bookId: currBook.bookId }
        );
        await this.em.persistAndFlush(newBookStory);
    }

}
