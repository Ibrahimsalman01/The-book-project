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
    
    public async createBook(currBook: Book): Promise<void> {
        try {
            await this.em.persistAndFlush(currBook);
            await this.createGenres(currBook);
            await this.createStory(currBook);
        } catch (error) {
            console.error(`Unable to add new book due to: ${error}`);
        }
    }

    public async createGenres(currBook: Book): Promise<void> {
        try {
            const currBookId = currBook.bookId;
            const genresArray = currBook.genres;
        
            for (const currGenre of genresArray) {
                await this.checkAndAddGenre(currGenre, currBookId);
            }
        } catch (error) {
            console.error(`Error creating genres: ${error}`);
        }
    }

    private async checkAndAddGenre(genre: string, bookId: number): Promise<void> {
        try {
            const checkGenre = await this.em.findOne(Genre, { genre: genre });
            let genreId: number;
            if (!checkGenre) {
                const newGenre = new Genre(genre);
                await this.em.persistAndFlush(newGenre);
                genreId = newGenre.genreId!;
            } else {
                genreId = checkGenre.genreId!;
            }

            const newBookGenre = new BookGenre(bookId, genreId);
            await this.em.persistAndFlush(newBookGenre);
        } catch (error) {
            console.error(`Error checking/adding genre: ${error}`);
        }
    }

    public async createStory(currBook: Book): Promise<void> {
        try {
            const newBookStory = new BookStory(
                currBook.story, 
                { bookId: currBook.bookId }
            );

            await this.em.persistAndFlush(newBookStory);
        } catch (error) {
            console.error(`Error creating story: ${error}`);
        }
    }

    public async readAllBooks(): Promise<void> {
        try {
            console.log('problem 4');
            const books = await this.em.findAll(Book);
            console.log(books);
        } catch (error) {
            console.error(`Error reading all books: ${error}`);
        }
    }
}
